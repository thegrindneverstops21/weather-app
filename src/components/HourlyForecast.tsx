import { type HourlyWeather, type UnitSettings } from '../types/weather';
import { getWeatherInfo } from '../services/weatherCodeMap';
import { convertTemperature, formatValue } from '../services/unitConversions';
import WeatherIcon from './WeatherIcon';
import './styles/HourlyForecast.css';
import { useRef, useState, type MouseEvent } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface HourlyForecastProps {
    hourly: HourlyWeather[];
    units: UnitSettings;
}

const COLLAPSED_COUNT = 7;

export default function HourlyForecast({ hourly, units }: HourlyForecastProps) {
    const [expanded, setExpanded] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    // Tracks if mouse button is pressed
    const isDown = useRef(false);
    // tracks the start point of drag
    const startX = useRef(0);
    // remembers the start value of drag
    const scrollLeft = useRef(0);
    // checks how many cards to display
    const items = expanded ? hourly.slice(0, 24) : hourly.slice(0, COLLAPSED_COUNT);

    // Mouse Event Handlers: []
    const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        if (!expanded || !scrollRef.current) return; // Only drag when expanded
        isDown.current = true;
        scrollRef.current.classList.add('grabbing');
        startX.current = e.pageX - scrollRef.current.offsetLeft;
        scrollLeft.current = scrollRef.current.scrollLeft;
    };

    const handleMouseLeaveOrUp = () => {
        isDown.current = false;
        if (scrollRef.current) {
            scrollRef.current.classList.remove('grabbing');
        }
    };

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDown.current || !scrollRef.current || !expanded) return;
        e.preventDefault(); // Stop default text highlighting
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; // Drag speed modifier
        scrollRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div className="hourly-forecast-wrap">
            <div 
                className={`hourly-forecast ${expanded ? 'scrollable' : ''}`} 
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeaveOrUp}
                onMouseUp={handleMouseLeaveOrUp}
                onMouseMove={handleMouseMove}
                style={{
                    cursor: expanded ? 'grab' : 'default',
                    userSelect: expanded ? 'none' : 'auto',
                    WebkitUserSelect: expanded ? 'none' : 'auto'
                }}
            >
                {items.map((hour) => {
                    const code = Array.isArray(hour.weatherCode) ? hour.weatherCode[0] : hour.weatherCode;
                    const info = getWeatherInfo(code, true);
                    const hourTime = Array.isArray(hour.time) ? hour.time[0] : hour.time;
                    const temperature = Array.isArray(hour.temperature) ? hour.temperature[0] : hour.temperature;
                    const time = new Date(hourTime).toLocaleTimeString('en-ZA', {
                        hour: 'numeric',
                    });

                    return (
                        <div key={hourTime} className="hourly-item">
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
                        Show Less <ChevronDown size={18} />
                    </>
                ) : (
                    <>
                        Show more <ChevronUp size={18} />
                    </>
                )}
            </button>
        </div>
    );
}
