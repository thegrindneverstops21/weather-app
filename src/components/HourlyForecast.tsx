import { type HourlyForecastItem, type UnitSettings } from '../types/weather';
import { getWeatherInfo } from '../services/weatherCodeMap';
import { convertTemperature, formatValue } from '../services/unitConversions';
import WeatherIcon from './WeatherIcon';
import './styles/HourlyForecast.css';

interface HourlyForecastProps {
    hourly: HourlyForecastItem[];
    units: UnitSettings;
}

export default function HourlyForecast({ hourly, units }: HourlyForecastProps) {
    const next24 = hourly.slice(0, 24);

    return (
        <div className="hourly-forecast">
            {next24.map((hour) => {
                const info = getWeatherInfo(hour.weatherCode, true);
                const time = new Date(hour.time).toLocaleTimeString('en-ZA', {
                    hour: 'numeric',
                });

                return (
                    <div key={hour.time} className="hourly-item">
                        <span className="hourly-time">{time}</span>
                        <WeatherIcon icon={info.icon} size={26} />
                        <span className="hourly-temp">
                            {formatValue(convertTemperature(hour.temperature, units.temperature))}°
                        </span>
                    </div>
                );
            })}
        </div>
    );
}