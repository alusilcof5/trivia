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

  useEffect(() => {
    resetScore();
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const { amount, category, difficulty } = settings;
      let url = `https://opentdb.com/api.php?amount=${amount || 10}`;
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.response_code === 0) {
        setQuestions(data.results);
      } else {
        setError('No se pudieron cargar las preguntas. Intenta con otros parámetros.');
      }
    } catch {
      setError('Error de conexión. Verifica tu internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      saveGame({
        totalQuestions: questions.length,
        category: settings.category,
        difficulty: settings.difficulty
      });
      navigate('/score');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando preguntas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops!</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/settings')} className="btn-primary">
            Volver a configuración
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="page-container">
        <div className="error-container">
          <p>No hay preguntas disponibles</p>
          <button onClick={() => navigate('/settings')} className="btn-primary">
            Volver
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="page-container">
      <div className="game-page">
        <ScoreBoard />

        <div className="progress-section">
          <div className="progress-info">
            <span>Pregunta {currentIndex + 1} de {questions.length}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
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