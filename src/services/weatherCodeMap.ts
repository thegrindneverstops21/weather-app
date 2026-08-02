export interface WeatherCodeInfo {
    label: string;
    icon: string;
}

//weather interpretation codes from Open Meteo API
const WEATHER_CODES: Record<number, { day: WeatherCodeInfo; night: WeatherCodeInfo }> = {
    0: { day: { label: 'Clear sky', icon: 'Sun'}, night: { label: 'Clear sky', icon: 'Moon'} },
    1: { day: { label: 'Mainly clear', icon: 'Sun'}, night: { label: 'Mainly clear', icon: 'Moon'} },
    2: { day: { label: 'Partly cloudy', icon: 'CloudSun'}, night: { label: 'Partly cloudy', icon: 'CloudMoon'} },
    3: { day: { label: 'Overcast', icon: 'Cloud'}, night: { label: 'Overcast', icon: 'Cloud'} },
    45: { day: { label: 'Fog', icon: 'CloudFog'}, night: { label: 'Fog', icon: 'CloudFog'} },
    48: { day: { label: 'Depositing rime fog', icon: 'CloudFog'}, night: { label: 'Depositing rime fog', icon: 'CloudFog'} },
    51: { day: { label: 'Light drizzle', icon: 'CloudDrizzle'}, night: { label: 'Light drizzle', icon: 'CloudDrizzle'} },
    53: { day: { label: 'Moderate drizzle', icon: 'CloudDrizzle'}, night: { label: 'Moderate drizzle', icon: 'CloudDrizzle'} },
    55: { day: { label: 'Dense drizzle', icon: 'CloudDrizzle'}, night: { label: 'Dense drizzle', icon: 'CloudDrizzle'} },
    61: { day: { label: 'Slight rain', icon: 'CloudRain'}, night: { label: 'Slight rain', icon: 'CloudRain'} },
    63: { day: { label: 'Moderate rain', icon: 'CloudRain'}, night: { label: 'Moderate rain', icon: 'CloudRain'} },
    65: { day: { label: 'Heavy rain', icon: 'CloudRain'}, night: { label: 'Heavy rain', icon: 'CloudRain'} },
    71: { day: { label: 'Slight snow', icon: 'CloudSnow'}, night: { label: 'Slight snow', icon: 'CloudSnow'} },
    73: { day: { label: 'Moderate snow', icon: 'CloudSnow'}, night: { label: 'Moderate snow', icon: 'CloudSnow'} },
    75: { day: { label: 'Heavy snow', icon: 'CloudSnow'}, night: { label: 'Heavy snow', icon: 'CloudSnow'} },
    80: { day: { label: 'Slight rain showers', icon: 'CloudRain'}, night: { label: 'Slight rain showers', icon: 'CloudRain'} },
    81: { day: { label: 'Moderate rain showers', icon: 'CloudRain'}, night: { label: 'Moderate rain showers', icon: 'CloudRain'} },
    82: { day: { label: 'Violent rain showers', icon: 'CloudRain'}, night: { label: 'Violent rain showers', icon: 'CloudRain'} },
    95: { day: { label: 'Thunderstorm', icon: 'CloudLightning'}, night: { label: 'Thunderstorm', icon: 'CloudLightning'} },
    96: { day: { label: 'Thunderstorm with slight hail', icon: 'CloudLightning'}, night: { label: 'Thunderstorm with slight hail', icon: 'CloudLightning'} },
    99: { day: { label: 'Thunderstorm with heavy hail', icon: 'CloudLightning'}, night: { label: 'Thunderstorm with heavy hail', icon: 'CloudLightning'} }
};

export function getWeatherInfo(code: number, isDay: boolean): WeatherCodeInfo {
    const entry = WEATHER_CODES[code];
    if (!entry) {
        return { label: 'Unknown', icon: 'CloudQuestion' };
    }
    return isDay ? entry.day : entry.night;
}