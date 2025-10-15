const AnswerButton = ({ answer, isCorrect, isSelected, showResult, onClick, disabled }) => {
  const decodeHTML = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  let className = 'answer-button';
  
  if (showResult) {
    if (isSelected && isCorrect) {
      className += ' answer-correct';
    } else if (isSelected && !isCorrect) {
      className += ' answer-incorrect';
    } else if (isCorrect) {
      className += ' answer-correct';
    } else {
      className += ' answer-disabled';
    }
  }

  return (
    <button 
      className={className} 
      onClick={onClick} 
      disabled={disabled}
    >
      {decodeHTML(answer)}
    </button>
  );
};

export default AnswerButton;