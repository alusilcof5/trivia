import SettingsForm from '../components/SettingsForm';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="page-container">
      <div className="settings-page">
        <div className="page-header">
          <Link to="/" className="back-link">← Volver</Link>
          <h1>Configuración del Juego</h1>
          <p className="page-description">
            Personaliza tu experiencia de juego eligiendo la cantidad de preguntas,
            la categoría y el nivel de dificultad.
          </p>
        </div>

        <div className="settings-content">
          <SettingsForm />
          
          <div className="settings-info">
            <div className="info-card">
              <h3>💡 Consejos</h3>
              <ul>
                <li>Empieza con 10 preguntas para familiarizarte</li>
                <li>Elige una categoría específica para mejorar en ese tema</li>
                <li>La dificultad "Media" ofrece el mejor equilibrio</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;