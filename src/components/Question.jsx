import { useState, useEffect } from 'react';
import AnswerButton from './AnswerButton';

// Función para decodificar HTML entities
const decodeHTML = (html) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

// Función para mezclar array (Fisher-Yates)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Question = ({ question, onCorrect, onIncorrect, onNext }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  // Mezclar respuestas cuando cambia la pregunta
  useEffect(() => {
    if (question) {
      const allAnswers = [
        ...question.incorrect_answers,
        question.correct_answer
      ];
      setAnswers(shuffleArray(allAnswers));
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [question]);

  const handleAnswerClick = (answer) => {
    if (showResult) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === question.correct_answer;
    if (isCorrect) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const getDifficultyClass = () => {
    const diff = question.difficulty.toLowerCase();
    if (diff === 'easy') return 'difficulty-easy';
    if (diff === 'medium') return 'difficulty-medium';
    if (diff === 'hard') return 'difficulty-hard';
    return '';
  };

  if (!question) return null;

  return (
    <div className="question-container">
      <div className="question-header">
        <span className="question-category">
          {decodeHTML(question.category)}
        </span>
        <span className={`question-difficulty ${getDifficultyClass()}`}>
          {question.difficulty}
        </span>
      </div>

      <h2 className="question-text">
        {decodeHTML(question.question)}
      </h2>

      <div className="answers-grid">
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            answer={answer}
            isCorrect={answer === question.correct_answer}
            isSelected={answer === selectedAnswer}
            showResult={showResult}
            onClick={() => handleAnswerClick(answer)}
            disabled={showResult}
          />
        ))}
      </div>

      {showResult && (
        <>
          <div className={`result-message ${
            selectedAnswer === question.correct_answer 
              ? 'result-success' 
              : 'result-error'
          }`}>
            <span className="result-icon">
              {selectedAnswer === question.correct_answer ? '✓' : '✗'}
            </span>
            <p>
              {selectedAnswer === question.correct_answer 
                ? '¡Correcto!' 
                : 'Incorrecto'}
            </p>
            {selectedAnswer !== question.correct_answer && (
              <p>
                <strong>
                  Respuesta correcta: {decodeHTML(question.correct_answer)}
                </strong>
              </p>
            )}
          </div>

          <button 
            className="next-button" 
            onClick={onNext}
          >
            Siguiente Pregunta →
          </button>
        </>
      )}
    </div>
  );
};

export default Question;