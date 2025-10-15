import { useState, useEffect } from 'react';

function Question({ question, onCorrect, onIncorrect, onNext, shuffleArray }) {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (question) {
      const allAnswers = [
        question.correct_answer,
        ...question.incorrect_answers
      ];
      setShuffledAnswers(shuffleArray(allAnswers));
      setSelectedAnswer(null);
      setShowResult(false);
    }
  }, [question, shuffleArray]);

  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

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

  const getButtonClass = (answer) => {
    let className = 'answer-button';
    
    if (!showResult) {
      return className;
    }
    
    const isCorrect = answer === question.correct_answer;
    const isSelected = answer === selectedAnswer;
    
    if (isSelected) {
      className += isCorrect ? ' correct' : ' incorrect';
    } else if (isCorrect) {
      className += ' correct';
    } else {
      className += ' disabled';
    }
    
    return className;
  };

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="category">{question.category}</span>
        <span className={`difficulty ${question.difficulty}`}>
          {question.difficulty}
        </span>
      </div>

      <h3 className="question-text">
        {decodeHTML(question.question)}
      </h3>

      <div className="answers">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={getButtonClass(answer)}
            onClick={() => handleAnswerClick(answer)}
            disabled={showResult}
          >
            {decodeHTML(answer)}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`result-message ${selectedAnswer === question.correct_answer ? 'success' : 'error'}`}>
          {selectedAnswer === question.correct_answer ? (
            <p>🎉 ¡Correcto! Bien hecho.</p>
          ) : (
            <p>
              ❌ Incorrecto. La respuesta correcta es: 
              <strong> {decodeHTML(question.correct_answer)}</strong>
            </p>
          )}
        </div>
      )}

      {showResult && (
        <button className="next-button" onClick={onNext}>
          Siguiente pregunta →
        </button>
      )}
    </div>
  );
}

export default Question;
