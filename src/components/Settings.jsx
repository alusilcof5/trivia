import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import Setting from './Setting';

function Settings() {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  
  const [amount, setAmount] = useState(settings.amount || 10);
  const [category, setCategory] = useState(settings.category || '');
  const [difficulty, setDifficulty] = useState(settings.difficulty || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({ amount, category, difficulty });
    navigate('/questions');
  };

  return (
    <div className="settings-container">
      <h2>Configuración del Juego</h2>
      <form onSubmit={handleSubmit}>
        
        <Setting label={`Número de preguntas: ${amount}`}>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>5</span>
            <span>50</span>
          </div>
        </Setting>

        <Setting label="Categoría">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Cualquiera</option>
            <option value="9">Cultura General</option>
            <option value="21">Deportes</option>
            <option value="22">Geografía</option>
            <option value="23">Historia</option>
            <option value="17">Ciencia y Naturaleza</option>
            <option value="18">Informática</option>
            <option value="11">Cine</option>
            <option value="12">Música</option>
          </select>
        </Setting>

        <Setting label="Dificultad">
          <select 
            value={difficulty} 
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="">Cualquiera</option>
            <option value="easy">Fácil</option>
            <option value="medium">Media</option>
            <option value="hard">Difícil</option>
          </select>
        </Setting>

        <button type="submit" className="btn-start">
          Comenzar Juego
        </button>
      </form>
    </div>
  );
}

export default Settings;
