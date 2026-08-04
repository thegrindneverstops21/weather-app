import { convertPressure, convertVisibility, convertWindSpeed, type formatValue } from "../services/unitConversions";
import type { CurrentWeather, DailyWeather, HourlyWeather, UnitSettings } from "../types/weather";
import DetailCard from "./DetailCard";

interface DetailGridProps {
    current: CurrentWeather;
    hourlyNow: HourlyWeather | undefined;
    dailyToday: DailyWeather | undefined;
    units: UnitSettings;
}

export default function DetailGrid({ current, hourlyNow, dailyToday, units }: DetailGridProps) {
    const sunrise = dailyToday ? new Date(dailyToday.sunrise).toLocaleDateString('en-ZA', { hour: 'numeric', minute: '2-digit' }) : '--';
    const sunset = dailyToday ? new Date(dailyToday.sunset).toLocaleDateString('en-ZA', { hour: 'numeric', minute: '2-digit' }) : '--';

    return (
        <div className="detail-grid">
            <DetailCard
                icon="Sun"
                label="UV Index"
                value={hourlyNow ? formatValue(hourlyNow.uvIndex, 1) : '--'}
            />
            <DetailCard
                icon="Droplets"
                label="Humidity"
                value={formatValue(current.humidity)}
                unit="%"
            />
            <DetailCard
                icon="Wind"
                label="Wind"
                value={hourlyNow ? formatValue(convertWindSpeed(current.windSpeed, units.windSpeed)) : '--'}
            />
            <DetailCard
                icon="Thermometer"
                label="Dew Point"
                value={hourlyNow ? formatValue(hourlyNow.dewPoint, 1) : '--'}
                unit={`°${units.temperature}`}
            />
            <DetailCard
                icon="Gauge"
                label="Pressure"
                value={formatValue(convertPressure(current.pressure, units.pressure))}
                unit={units.pressure}
            />
              <DetailCard
                icon="Eye"
                label="Visibility"
                value={hourlyNow ? formatValue(convertVisibility.dewPoint, 1) : '--'}
                unit={`°${units.temperature}`}
            />
              <DetailCard
                icon="Thermometer"
                label="Dew Point"
                value={hourlyNow ? formatValue(hourlyNow.dewPoint, 1) : '--'}
                unit={`°${units.temperature}`}
            />

        </div>
    );
}