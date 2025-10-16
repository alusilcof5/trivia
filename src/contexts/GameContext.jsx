/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame debe usarse dentro de GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem('triviaScore');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error al cargar score:', error);
        return { correct: 0, incorrect: 0 };
      }
    }
    return { correct: 0, incorrect: 0 };
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('triviaHistory');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error al cargar historial:', error);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('triviaScore', JSON.stringify(score));
  }, [score]);

  useEffect(() => {
    localStorage.setItem('triviaHistory', JSON.stringify(history));
  }, [history]);

  const addCorrect = () => {
    setScore(prev => ({
      ...prev,
      correct: prev.correct + 1
    }));
  };

  const addIncorrect = () => {
    setScore(prev => ({
      ...prev,
      incorrect: prev.incorrect + 1
    }));
  };

  const resetScore = () => {
    setScore({
      correct: 0,
      incorrect: 0
    });
  };

  const saveGame = (gameData) => {
    const newGame = {
      id: Date.now(),
      date: new Date().toLocaleDateString('es-ES'),
      time: new Date().toLocaleTimeString('es-ES'),
      score: { ...score },
      ...gameData
    };
    setHistory(prev => [newGame, ...prev].slice(0, 10));
  };

  const getPercentage = () => {
    const total = score.correct + score.incorrect;
    if (total === 0) return 0;
    return Math.round((score.correct / total) * 100);
  };

  const value = {
    score,
    history,
    addCorrect,
    addIncorrect,
    resetScore,
    saveGame,
    getPercentage
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};