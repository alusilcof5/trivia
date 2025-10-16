import { Link } from 'react-router-dom';
import { useGame } from '../contexts/GameContext';

const Home = () => {
  const { history } = useGame();

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title">Open Trivia Pro</h1>
        <p className="hero-subtitle">
          Pon a prueba tus conocimientos con miles de preguntas
        </p>
        
        <div className="hero-actions">
          <Link to="/settings" className="btn-primary btn-large">
            Jugar Ahora
          </Link>
          <Link to="/score" className="btn-secondary btn-large">
            Ver Historial
          </Link>
        </div>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon"><img src="https://play-lh.googleusercontent.com/tCx_WNVSXFySbmZQQf_ERQFeGZtPN9NwL-Q2iEdRJHv87GE03hLvy-s1AcW8c6dp-L0=w240-h480" alt="Imagen de un circulo que representa trivia" /></div>
          <h3>Múltiples Categorías</h3>
          <p>Desde deportes hasta ciencia, hay temas para todos los gustos</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon"><img src="https://cdn.pixabay.com/animation/2023/10/22/03/31/03-31-43-608_256.gif" alt="Gif de progreso" /></div>
          <h3>Seguimiento de Progreso</h3>
          <p>Consulta tu historial y mejora tu precisión con cada partida</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon"><img src="https://cdn.pixabay.com/photo/2024/05/08/17/47/yo-yo-8748834_960_720.png" alt="Imagen de un Yo-yo" width="300" height="250" /></div>
          <h3>Personalizable</h3>
          <p>Ajusta la cantidad de preguntas y el nivel de dificultad</p>
        </div>
      </div>

      {history.length > 0 && (
        <div className="recent-games">
          <h2>Últimas Partidas</h2>
          <div className="games-list">
            {history.slice(0, 3).map(game => (
              <div key={game.id} className="game-item">
                <div className="game-date">
                  {game.date} - {game.time}
                </div>
                <div className="game-score">
                  ✓ {game.score.correct} | ✗ {game.score.incorrect}
                </div>
                <div className="game-percentage">
                  {Math.round((game.score.correct / (game.score.correct + game.score.incorrect)) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;