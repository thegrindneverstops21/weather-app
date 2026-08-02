import type { OpenMeteoResponse, CurrentWeather, HourlyWeather, DailyWeather } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export async function fetchWeatherData(latitude: number, longitude: number): Promise<OpenMeteoResponse> {
    const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),  
        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'weather_code',
            'wind_speed_10m',
            'wind_direction_10m',
            'pressure_msl', 
            'surface_pressure',
            'is_day',
        ].join(','),
        hourly: [
            'temperature_2m',
            'weather_code',
            'precipitation_probability',
            'relative_humidity_2m',
            'uv_index',
            'dew_point_2m',
            'visibility',
        ].join(','),
        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'uv_index_max',
            'sunrise',
            'sunset',
            'precipitation_probability_max'
        ].join(','),
        timezone: 'auto',
        forecast_days: '7',
    });

    const response = await fetch(`${BASE_URL}?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.status}`);
    }

    return response.json();
}

// geo-coding: turns a search string to latitude/longitude coordinates
export async function searchLocations(query: string) {
    const params = new URLSearchParams({
        name: query,
        count: '5',
        language: 'en',
        format: 'json', 
    });

    const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`Failed to search locations: ${response.status}`);
    }

    const data = await response.json();
    return data.results ?? [];
}

export function mapCurrentWeather(raw: OpenMeteoResponse): CurrentWeather {
    const current = raw.current;
    return {
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        windSpeed: current.wind_speed_10m,
        windDirection: current.wind_direction_10m,
        pressure: current.pressure_msl,
        weatherCode: current.weather_code,
        isDay: current.is_day === 1,
        time: current.time,
    };
}

export function mapHourlyWeather(raw: OpenMeteoResponse): HourlyWeather[] {
    const hourly = raw.hourly;
    return hourly.time.map((time, index) => ({
        time: [time],
        temperature: [hourly.temperature_2m[index]],
        weatherCode: [hourly.weather_code[index]],
        precipitationProbability: [hourly.precipitation_probability[index]],
        humidity: [hourly.relative_humidity_2m[index]],
        uvIndex: [hourly.uv_index[index]],
        dewPoint: [hourly.dew_point_2m[index]],
        visibility: [hourly.visibility[index]],
    }));
}

export function mapDailyWeather(raw: OpenMeteoResponse): DailyWeather[] {
    const daily = raw.daily;
    return daily.time.map((date, index) => ({
        date,
        weatherCode: daily.weather_code[index],
        tempMax: daily.temperature_2m_max[index],
        tempMin: daily.temperature_2m_min[index],
        uvIndexMax: daily.uv_index_max[index],
        sunrise: daily.sunrise[index],
        sunset: daily.sunset[index],
        precipitationProbability: daily.precipitation_probability_max[index],
    }));
}