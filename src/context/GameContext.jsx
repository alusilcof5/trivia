import { useState, useEffect } from 'react';
import { GameContext } from './GameContext';

// Provider
export const GameProvider = ({ children }) => {
  // Estado para aciertos y errores
  const [score, setScore] = useState({
    correct: 0,
    incorrect: 0
  });

  // Historial de partidas
  const [history, setHistory] = useState([]);

  // Cargar historial del localStorage al iniciar
  useEffect(() => {
    const saved = localStorage.getItem('triviaHistory');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  // Guardar historial cuando cambie
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('triviaHistory', JSON.stringify(history));
    }
  }, [history]);

  // Añadir acierto
  const addCorrect = () => {
    setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
  };

  // Añadir error
  const addIncorrect = () => {
    setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
  };

  // Resetear marcador
  const resetScore = () => {
    setScore({ correct: 0, incorrect: 0 });
  };

  // Guardar partida completa
  const saveGame = (gameData) => {
    const newGame = {
      id: Date.now(),
      date: new Date().toISOString(),
      score: { ...score },
      ...gameData
    };
    setHistory(prev => [newGame, ...prev].slice(0, 10));
  };

  const value = {
    score,
    history,
    addCorrect,
    addIncorrect,
    resetScore,
    saveGame
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};