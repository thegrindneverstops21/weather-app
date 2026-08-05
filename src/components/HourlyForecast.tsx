import { type HourlyWeather, type UnitSettings } from '../types/weather';
import { getWeatherInfo } from '../services/weatherCodeMap';
import { convertTemperature, formatValue } from '../services/unitConversions';
import WeatherIcon from './WeatherIcon';
import './styles/HourlyForecast.css';
import { useRef, useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';

interface HourlyForecastProps {
    hourly: HourlyWeather[];
    units: UnitSettings;
}

const COLLAPSED_COUNT = 8;

export default function HourlyForecast({ hourly, units }: HourlyForecastProps) {
    const [expanded, setExpanded] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const items = expanded ? hourly.slice(0, 24) : hourly.slice(0, COLLAPSED_COUNT);

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollRef.current) return;
        const amount = 240;
        scrollRef.current.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth',
        });
    };

    return (
        <div className="hourly-forecast-wrap">
            <div className="hourly-forecast-row">
                {expanded && (
                    <button
                        className="hourly-scroll-btn hourly-scroll-btn-left"
                        onClick={() => scroll('left')}
                        aria-label='Scrll left'
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}
            </div>

            <div className={`hourly-forecast ${expanded ? 'scrollable' : ''}`} ref={scrollRef}>
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
                            <WeatherIcon icon={info.icon} size={26} />
                            <span className="hourly-temp">
                                {formatValue(convertTemperature(temperature, units.temperature))}°
                            </span>
                        </div>
                    );
                })}


                {expanded && (
                    <button
                        className='hourly-scroll-btn hourly-scroll-btn-right'
                        onClick={() => scroll('right')}
                        aria-label='Scroll right'
                    >
                        <ChevronRight size={18} />
                    </button>
                )}
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