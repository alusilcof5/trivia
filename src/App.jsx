import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import { GameProvider } from './contexts/GameContext';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Score from './pages/Score';

function App() {
  return (
    <SettingsProvider>
      <GameProvider>
        <Router basename="/trivia">
          <div className="app">
            <nav className="navbar">
              <div className="nav-container">
                <Link to="/" className="nav-logo">
                  Open Trivia Pro
                </Link>
                
                <ul className="nav-menu">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">Inicio</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="nav-link">Configuración</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/score" className="nav-link">Resultados</Link>
                  </li>
                </ul>
              </div>
            </nav>

            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/game" element={<Game />} />
                <Route path="/score" element={<Score />} />
                <Route path="*" element={
                  <div className="page-container">
                    <div className="error-container">
                      <div className="error-icon">404</div>
                      <h2>Página no encontrada</h2>
                      <Link to="/" className="btn-primary">Volver al inicio</Link>
                    </div>
                  </div>
                } />
              </Routes>
            </main>

            <footer className="footer">
              <div className="footer-content">
                <p>© 2025 Open Trivia Pro - Desarrollado con React</p>
                <p className="footer-credits">
                  Datos proporcionados por <a href="https://opentdb.com" target="_blank" rel="noopener noreferrer">Open Trivia Database</a>
                </p>
              </div>
            </footer>
          </div>
        </Router>
      </GameProvider>
    </SettingsProvider>
  );
}

export default App;