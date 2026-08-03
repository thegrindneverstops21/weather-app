import { type Location, type CurrentWeather as CurrentWeatherType, type UnitSettings } from '../types/weather';
import { getWeatherInfo } from '../services/weatherCodeMap';
import { convertTemperature, formatValue } from '../services/unitConversions';
import WeatherIcon from './WeatherIcon';
import './styles/CurrentWeather.css';

interface CurrentWeatherProps {
    location: Location;
    weather: CurrentWeatherType;
    units: UnitSettings;
}

export default function CurrentWeather({ location, weather, units}: CurrentWeatherProps ){
    const info = getWeatherInfo(weather.weatherCode, weather.isDay);
    const temp = convertTemperature(weather.temperature, units.temperature);

    const formattedDate = new Date(weather.time).toLocaleDateString('en-ZA', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        weekday: 'long',
    });

    const formattedTime = new Date(weather.time).toLocaleDateString('en-ZA', {
        hour: 'numeric',
        minute: '2-digit',
    });

    return(
        <div className="current-weather">
            <div className="location-pill">
                <span>{location.isCurrentLocation ? '📍' : '' } {location.name}</span>
            </div>

            <div className="current-weather-icon">
                <WeatherIcon icon={info.icon} size={80} />
            </div>

            <div className="current-temp">
                {formatValue(temp)}°{units.temperature}
            </div>

            <div className="current-condition">{info.label}</div>

            <div className="current-datetime">
                <div>{formattedDate}</div>
                <div>{formattedTime}</div>
            </div>
        </div>
    );
}