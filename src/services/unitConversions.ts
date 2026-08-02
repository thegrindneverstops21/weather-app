import { type UnitSettings } from '../types/weather'

export function convertTemperature(celcius: number, unit: UnitSettings['temperature']): number {
    return unit === 'F' ? (celcius * 9) / 5 + 32 : celcius;
}

export function convertWindSpeed(kmh: number, unit: UnitSettings['windSpeed']): number {
    return unit === 'mph' ? kmh * 0.621371: kmh;
}

export function convertPressure(hPa: number, unit: UnitSettings['pressure']): number {
    return unit === 'inHg' ? hPa * 0.02953 : hPa;
}

export function convertVisibility(meters: number, unit: UnitSettings['visibility']): number {
    const km = meters / 1000;
    return unit === 'mi' ? km * 0.621371 : km;
}

export function convertPrecipitation(mm: number, unit: UnitSettings['precipitation']): number {
    return unit === 'in' ? mm * 0.0393701 : mm;
}

export function formatValue(value: number, decimals = 0): string {
    return value.toFixed(decimals);
}