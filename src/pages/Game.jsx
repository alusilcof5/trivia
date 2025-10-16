import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useGame } from '../contexts/GameContext';
import Question from '../components/Question';
import ScoreBoard from '../components/ScoreBoard';

const Game = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { resetScore, addCorrect, addIncorrect, saveGame } = useGame();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    resetScore();
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { amount = 10, category, difficulty } = settings || {};
      
      // Validar cantidad
      if (!Number.isInteger(Number(amount)) || amount < 1) {
        setError('La cantidad de preguntas debe ser un número válido mayor que 0.');
        setLoading(false);
        return;
      }

      // Construir URL
      let url = `https://opentdb.com/api.php?amount=${amount}&type=multiple`;
      if (category && Number.isInteger(Number(category))) {
        url += `&category=${category}`;
      }
      if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty.toLowerCase())) {
        url += `&difficulty=${difficulty.toLowerCase()}`;
      }

      console.log('Fetching from:', url);

      const response = await fetch(url);
      
      // Manejar error 429 (Too Many Requests)
      if (response.status === 429) {
        throw new Error('RATE_LIMIT');
      }

      // Manejar otros errores HTTP
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      // Verificar respuesta exitosa
      if (data.response_code === 0 && data.results && data.results.length > 0) {
        setQuestions(data.results);
        setError(null);
      } else if (data.response_code === 1) {
        setError('No se encontraron preguntas con estos parámetros. Intenta con otros filtros.');
      } else if (data.response_code === 2) {
        setError('Parámetros inválidos. Por favor revisa la configuración.');
      } else {
        setError('No se pudieron cargar las preguntas. Intenta nuevamente.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      
      if (err.message === 'RATE_LIMIT') {
        setError('Has hecho demasiadas peticiones. Por favor espera 5 segundos y presiona "Reintentar".');
      } else if (err.message.includes('Failed to fetch')) {
        setError('Error de conexión. Verifica tu internet.');
      } else {
        setError(err.message || 'Error desconocido al cargar preguntas.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    setRetryCount(prev => prev + 1);
    
    // Esperar 5 segundos antes de reintentar (para rate limiting)
    setTimeout(() => {
      fetchQuestions();
    }, 5000);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      saveGame({
        totalQuestions: questions.length,
        category: settings.category,
        difficulty: settings.difficulty,
      });
      navigate('/score');
    }
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando preguntas...</p>
          {retryCount > 0 && (
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              Esperando {5} segundos... (Intento {retryCount})
            </p>
          )}
        </div>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops!</h2>
          <p>{error}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={handleRetry} className="btn-primary">
              {error.includes('demasiadas peticiones') ? 'Reintentar (esperando 5s)' : 'Reintentar'}
            </button>
            <button onClick={() => navigate('/settings')} className="btn-secondary">
              Cambiar Configuración
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary">
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // NO QUESTIONS STATE
  if (questions.length === 0 || !questions[currentIndex]) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error-icon">📭</div>
          <h2>No hay preguntas disponibles</h2>
          <p>No se encontraron preguntas con la configuración actual.</p>
          <button onClick={() => navigate('/settings')} className="btn-primary">
            Cambiar Configuración
          </button>
        </div>
      </div>
    );
  }

  // GAME STATE
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="page-container">
      <div className="game-page">
        <ScoreBoard />
        
        <div className="progress-section">
          <div className="progress-info">
            <span>
              Pregunta {currentIndex + 1} de {questions.length}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
        
        <Question
          question={currentQuestion}
          onCorrect={addCorrect}
          onIncorrect={addIncorrect}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Game;