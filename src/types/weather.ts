export interface OpenMeteoResponse {
    latitude: number;
    longitude: number;
    timezone: string;
    current: CurrentWeatherRaw;
    hourly: HourlyRaw;
    daily: DailyRaw;
}

export interface CurrentWeatherRaw {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    pressure_msl: number;
    surface_pressure: number;
    is_day: number;
}

export interface HourlyRaw {
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    precipitation_probability: number[];
    relative_humidity_2m: number[];
    uv_index: number[];
    dew_point_2m: number[];
    visibility: number[];
}

export interface DailyRaw {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    uv_index_max: number[];
    sunrise: string[];
    sunset: string[];
    precipitation_probability_max: number[];
}

export interface CurrentWeather {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    windDirection: number;
    pressure: number;
    weatherCode: number;
    isDay: boolean;
    time: string;
}

export interface HourlyWeather {
    time: string[];
    temperature: number[];
    weatherCode: number[];
    precipitationProbability: number[];
    humidity: number[];
    uvIndex: number[];
    dewPoint: number[];
    visibility: number[];
}

export interface DailyWeather {
    date: string;
    weatherCode: number;
    tempMax: number;
    tempMin: number;
    uvIndexMax: number;
    sunrise: string;
    sunset: string;
    precipitationProbability: number;
}

export interface Location {
    id: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    isCurrentLocation?: boolean;
}

export type TemperatureUnit = "C" | "F";
export type WindSpeedUnit = "km/h" | "mph";
export type PressureUnit = "hPa" | "inHg";
export type VisibilityUnit = "km" | "mi";
export type PrecipitationUnit = "mm" | "in";
export type ForecastView = "hourly" | "daily";