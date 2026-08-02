/* API provider response shape */
export interface OpenMeteoResponse {
    latitude: number;
    longitude: number;
    timezone: string;
    current: CurrentWeatherRaw;
    hourly: HourlyRaw;
    daily: DailyRaw;
}

/* defines structure of the current weather data */
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

/* defines structure of the hourly weather data */
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

/* defines structure of the daily weather data */
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

/* defines current weather conditions */
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

/* defines hourly weather conditions */
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

/* defines daily weather conditions */
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

/* defines the location structure for the weather app */
export interface Location {
    id: string;
    name: string;
    country: string;
    latitude: number;
    longitude: number;
    isCurrentLocation?: boolean;
}

/* declares reusable types for the weather app */
export type TemperatureUnit = "C" | "F";
export type WindSpeedUnit = "km/h" | "mph";
export type PressureUnit = "hPa" | "inHg";
export type VisibilityUnit = "km" | "mi";
export type PrecipitationUnit = "mm" | "in";
export type ForecastView = "hourly" | "daily";

/* defines the structure for unit settings in the weather app */
export interface UnitSettings {
    temperature: TemperatureUnit;
    windSpeed: WindSpeedUnit;
    pressure: PressureUnit;
    visibility: VisibilityUnit;
    precipitation: PrecipitationUnit;   
}

/* defines the default unit settings for the weather app */
export const DEFAULT_UNITS: UnitSettings = {
    temperature: "C",
    windSpeed: "km/h",
    pressure: "hPa",
    visibility: "km",
    precipitation: "mm",
};