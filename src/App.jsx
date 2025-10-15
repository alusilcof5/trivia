import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { GameProvider } from './context/GameContext';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import About from './components/About';
import Settings from './components/Settings';
import Questions from './components/Questions';
import NotFound from './components/NotFound';

function App() {
  return (
    <SettingsProvider>
      <GameProvider>
        <Router>
          <Header />
          <NavBar />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </GameProvider>
    </SettingsProvider>
  );
}

export default App;