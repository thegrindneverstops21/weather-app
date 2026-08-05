import { type ForecastView } from '../types/weather';
import './styles/ForecastToggle.css';

interface ForecastToggleProps {
    view: ForecastView;
    onChange: (view: ForecastView) => void;
}

export default function ForecastToggle({ view, onChange }: ForecastToggleProps) {
    return (
        <div className="forecast-toggle">
            <button
                className={`forecast-toggle-btn ${view === 'hourly' ? 'active' : ''}`}
                onClick={() => onChange('hourly')}
            >
                Hourly
            </button>
            <button
                className={`forecast-toggle-btn ${view === 'daily' ? 'active' : ''}`}
                onClick={() => onChange('daily')}
            >
                Daily
            </button>
        </div>
    );
}