import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';

const SettingsForm = () => {
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();
  
  const [amount, setAmount] = useState(settings.amount || 10);
  const [category, setCategory] = useState(settings.category || '');
  const [difficulty, setDifficulty] = useState(settings.difficulty || '');

  const categories = [
    { value: '', label: 'Cualquier categoría' },
    { value: '9', label: 'Cultura General' },
    { value: '10', label: 'Libros' },
    { value: '11', label: 'Cine' },
    { value: '12', label: 'Música' },
    { value: '14', label: 'Televisión' },
    { value: '15', label: 'Videojuegos' },
    { value: '17', label: 'Ciencia y Naturaleza' },
    { value: '18', label: 'Informática' },
    { value: '21', label: 'Deportes' },
    { value: '22', label: 'Geografía' },
    { value: '23', label: 'Historia' },
    { value: '27', label: 'Animales' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({ amount, category, difficulty });
    navigate('/game');
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="amount">
          Número de preguntas: <strong>{amount}</strong>
        </label>
        <input
          type="range"
          id="amount"
          min="5"
          max="50"
          step="5"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="range-input"
        />
        <div className="range-labels">
          <span>5</span>
          <span>50</span>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="category">Categoría</label>
        <select 
          id="category"
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="select-input"
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="difficulty">Dificultad</label>
        <select 
          id="difficulty"
          value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="select-input"
        >
          <option value="">Cualquier dificultad</option>
          <option value="easy">Fácil</option>
          <option value="medium">Media</option>
          <option value="hard">Difícil</option>
        </select>
      </div>

      <button type="submit" className="btn-primary">
        Comenzar Juego
      </button>
    </form>
  );
};

export default SettingsForm;