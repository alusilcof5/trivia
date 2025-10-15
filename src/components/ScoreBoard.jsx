import { useGame } from '../contexts/GameContext';

const ScoreBoard = () => {
  const { score, getPercentage } = useGame();
  const total = score.correct + score.incorrect;

  return (
    <div className="scoreboard">
      <div className="score-card">
        <div className="score-icon correct-icon">✓</div>
        <div className="score-info">
          <div className="score-label">Aciertos</div>
          <div className="score-value">{score.correct}</div>
        </div>
      </div>

      <div className="score-divider"></div>

      <div className="score-card">
        <div className="score-icon incorrect-icon">✗</div>
        <div className="score-info">
          <div className="score-label">Errores</div>
          <div className="score-value">{score.incorrect}</div>
        </div>
      </div>

      <div className="score-divider"></div>

      <div className="score-card">
        <div className="score-icon percentage-icon">%</div>
        <div className="score-info">
          <div className="score-label">Precisión</div>
          <div className="score-value">{getPercentage()}%</div>
        </div>
      </div>

      {total > 0 && (
        <div className="score-total">
          Total de preguntas: {total}
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;