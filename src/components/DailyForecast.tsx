import { type DailyWeather, type UnitSettings } from '../types/weather';
import { getWeatherInfo } from '../services/weatherCodeMap';
import { convertTemperature, formatValue } from '../services/unitConversions';
import WeatherIcon from './WeatherIcon';
import './styles/DailyForecast.css';

interface DailyForecastProps {
    daily: DailyWeather[];
    units: UnitSettings;
}

export default function DailyForecast({ daily, units }: DailyForecastProps) {
    return (
        <div className="daily-forecast">
            {daily.map((day, index) => {
                const info = getWeatherInfo(day.weatherCode, true);
                const label =
                    index === 0
                        ? 'Today'
                        : new Date(day.date).toLocaleDateString('en-ZA', { weekday: 'short' });

                return (
                    <div key={day.date} className="daily-item">
                        <span className="daily-day">{label}</span>
                        <WeatherIcon icon={info.icon} size={24} />
                        <div className="daily-temps">
                            <span className="daily-temp-max">
                                {formatValue(convertTemperature(day.tempMax, units.temperature))}°
                            </span>
                            <span className="daily-temp-min">
                                {formatValue(convertTemperature(day.tempMin, units.temperature))}°
                            </span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}