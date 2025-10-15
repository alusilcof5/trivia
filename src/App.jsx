import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { GameProvider } from './context/GameContext';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Game from './pages/Game';
import Results from './pages/Results';
import './App.css';

function App() {
  return (
    <SettingsProvider>
      <GameProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/game" element={<Game />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </div>
        </Router>
      </GameProvider>
    </SettingsProvider>
  );
}

export default App;