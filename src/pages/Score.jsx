import { Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';

const Score = () => {
  const { score, history, getPercentage } = useGame();
  const total = score.correct + score.incorrect;

  return (
    <div className="page-container">
      <div className="score-page">
        <div className="page-header">
          <h1>Resultados</h1>
        </div>

        {total > 0 ? (
          <>
            <div className="final-score">
              <div className="score-circle">
                <div className="score-percentage">{getPercentage()}%</div>
                <div className="score-label">Precisión</div>
              </div>

              <div className="score-details">
                <div className="detail-item success">
                  <span className="detail-icon">✓</span>
                  <span className="detail-label">Aciertos</span>
                  <span className="detail-value">{score.correct}</span>
                </div>

                <div className="detail-item error">
                  <span className="detail-icon">✗</span>
                  <span className="detail-label">Errores</span>
                  <span className="detail-value">{score.incorrect}</span>
                </div>

                <div className="detail-item total">
                  <span className="detail-icon">∑</span>
                  <span className="detail-label">Total</span>
                  <span className="detail-value">{total}</span>
                </div>
              </div>

              <div className="score-message">
                {getPercentage() >= 80 && (
                  <p>🎉 ¡Excelente! Eres todo un experto.</p>
                )}
                {getPercentage() >= 60 && getPercentage() < 80 && (
                  <p>👏 ¡Muy bien! Buen trabajo.</p>
                )}
                {getPercentage() >= 40 && getPercentage() < 60 && (
                  <p>👍 No está mal. ¡Sigue practicando!</p>
                )}
                {getPercentage() < 40 && (
                  <p>💪 No te rindas. ¡La práctica hace al maestro!</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="no-score">
            <p>No has jugado ninguna partida todavía.</p>
          </div>
        )}

        <div className="score-actions">
          <Link to="/settings" className="btn-primary">
            Jugar de Nuevo
          </Link>
          <Link to="/" className="btn-secondary">
            Volver al Inicio
          </Link>
        </div>

        {history.length > 0 && (
          <div className="history-section">
            <h2>Historial de Partidas</h2>
            <div className="history-list">
              {history.map(game => {
                const gameTotal = game.score.correct + game.score.incorrect;
                const gamePercentage = Math.round((game.score.correct / gameTotal) * 100);

                return (
                  <div key={game.id} className="history-item">
                    <div className="history-date">
                      <div>{game.date}</div>
                      <div className="history-time">{game.time}</div>
                    </div>
                    
                    <div className="history-stats">
                      <span className="stat-correct">✓ {game.score.correct}</span>
                      <span className="stat-incorrect">✗ {game.score.incorrect}</span>
                      <span className="stat-percentage">{gamePercentage}%</span>
                    </div>

                    <div className="history-total">
                      {gameTotal} preguntas
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Score;