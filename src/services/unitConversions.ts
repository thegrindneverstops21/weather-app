import { type UnitSettings } from '../types/weather'

/* converts temperature from celcius to fahrenheit */
export function convertTemperature(celcius: number, unit: UnitSettings['temperature']): number {
    return unit === 'F' ? (celcius * 9) / 5 + 32 : celcius;
}

/* converts the wind speed from kmh to mph */
export function convertWindSpeed(kmh: number, unit: UnitSettings['windSpeed']): number {
    return unit === 'mph' ? kmh * 0.621371: kmh;
}

/* converts the pressure from hpa to inHg */
export function convertPressure(hPa: number, unit: UnitSettings['pressure']): number {
    return unit === 'inHg' ? hPa * 0.02953 : hPa;
}

/* converts the visibility from meters to kilometers then to miles */
export function convertVisibility(meters: number, unit: UnitSettings['visibility']): number {
    const km = meters / 1000;
    return unit === 'mi' ? km * 0.621371 : km;
}

/* converts the precipitation from mm to inches */
export function convertPrecipitation(mm: number, unit: UnitSettings['precipitation']): number {
    return unit === 'in' ? mm * 0.0393701 : mm;
}

/* formats the value to a whole number */
export function formatValue(value: number, decimals = 0): string {
    return value.toFixed(decimals);
}