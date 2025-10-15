import { useState, useEffect } from 'react';
import { SettingsContext } from './SettingsContext';

export const SettingsProvider = ({ children }) => {
  const defaultSettings = {
    amount: 10,
    category: '',
    difficulty: ''
  };

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('triviaSettings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error al cargar settings:', error);
        return defaultSettings;
      }
    }
    return defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('triviaSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('triviaSettings');
  };

  const value = {
    settings,
    updateSettings,
    resetSettings
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};