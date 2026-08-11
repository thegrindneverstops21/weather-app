import { type HourlyWeather, type UnitSettings } from '../types/weather';
import { getWeatherInfo } from '../services/weatherCodeMap';
import { convertTemperature, formatValue } from '../services/unitConversions';
import WeatherIcon from './WeatherIcon';
import './styles/HourlyForecast.css';
import { useRef, useState, type MouseEvent } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { findCurrentHourIndex } from '../services/weatherService';

interface HourlyForecastProps {
    hourly: HourlyWeather[];
    units: UnitSettings;
    currentHourIndex: number;
}

const COLLAPSED_COUNT = 7;

export default function HourlyForecast({ hourly, units, currentHourIndex }: HourlyForecastProps) {
    const [expanded, setExpanded] = useState(false);  
    
    const baseIndex = expanded ? 0 : currentHourIndex;
    const items = expanded ? hourly.slice(0, 24) : hourly.slice(currentHourIndex, currentHourIndex + COLLAPSED_COUNT);

    return (
        <div className="hourly-forecast-wrap">
            <div className='hourly-forecast'>
                {items.map((hour, i) => {
                    const absIndex = baseIndex + i;
                    const isNow = absIndex === currentHourIndex;
                    const isPast = absIndex < currentHourIndex;

                    const code = Array.isArray(hour.weatherCode) ? hour.weatherCode[0] : hour.weatherCode;
                    const info = getWeatherInfo(code, true);
                    const hourTime = Array.isArray(hour.time) ? hour.time[0] : hour.time;
                    const temperature = Array.isArray(hour.temperature) ? hour.temperature[0] : hour.temperature;
                    const time = isNow ? 'Now' : String(new Date(hourTime).getHours()).padStart(2, '0');
                
                    return (
                        <div key={hourTime} className={`hourly-item ${isNow ? 'now' : ''} ${isPast ? 'past' : ''}`}>
                            <span className="hourly-time">{time}</span>
                            <WeatherIcon icon={info.icon} size={30} />
                            <span className="hourly-temp">
                                {formatValue(convertTemperature(temperature, units.temperature))}°
                            </span>
                        </div>
                    );
                })}
            </div>
            
            <button className="hourly-toggle-button" onClick={() => setExpanded((prev) => !prev)}>
                {expanded ? (
                    <>
                        Show Less <ChevronUp size={18} />
                    </>
                ) : (
                    <>
                        Show more <ChevronDown size={18} />
                    </>
                )}
            </button>
        </div>
    );
}
