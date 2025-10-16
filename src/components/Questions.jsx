import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useGame } from '../contexts/GameContext';
import Question from './Question';

// Función para mezclar array (Fisher-Yates)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function Questions() {
  const navigate = useNavigate();
  const { settings } = useSettings();
  const { score, resetScore, addCorrect, addIncorrect, saveGame } = useGame();
  
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
        setError('No se pudieron cargar las preguntas');
      }
    } catch {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Terminar juego
      saveGame({
        totalQuestions: questions.length,
        category: settings.category,
        difficulty: settings.difficulty
      });
      alert(`¡Juego terminado!\n\nAciertos: ${score.correct}\nErrores: ${score.incorrect}`);
      navigate('/settings');
    }
  };

  if (loading) {
    return <div className="loading">Cargando preguntas...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => navigate('/settings')}>Volver</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div>No hay preguntas disponibles</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="questions-container">
      {/* MARCADOR VISIBLE */}
      <div className="scoreboard">
        <div className="score-item correct">
          <span>✓ Aciertos: {score.correct}</span>
        </div>
        <div className="score-item incorrect">
          <span>✗ Errores: {score.incorrect}</span>
        </div>
      </div>

      {/* Progreso */}
      <div className="progress">
        <p>Pregunta {currentIndex + 1} de {questions.length}</p>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Componente Question con lógica de juego */}
      <Question 
        question={currentQuestion}
        onCorrect={addCorrect}
        onIncorrect={addIncorrect}
        onNext={handleNext}
        shuffleArray={shuffleArray}
      />
    </div>
  );
}

export default Questions;