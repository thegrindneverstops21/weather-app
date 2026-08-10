import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_UNITS, type UnitSettings } from "../types/weather";

const STORAGE_KEY = 'weather-app-units';

const VALID_VALUES: { [K in keyof UnitSettings]: UnitSettings[K][] } = {
    temperature: ['C', 'F'],
    windSpeed: ['km/h', 'mph'],
    pressure: ['hPa', 'inHg'],
    visibility: ['km', 'mi'],
    precipitation: ['mm', 'in'],
};

// prevent outdated cache data from persisting
function sanitizeUnits(raw: Partial<UnitSettings> | null): UnitSettings {
    //fallback to default units if key is not the correct value
    if(!raw) return DEFAULT_UNITS;

    const result = {...DEFAULT_UNITS };
    (Object.keys(DEFAULT_UNITS) as (keyof UnitSettings)[]).forEach((key) => {
        const value = raw[key];
        if (value && (VALID_VALUES[key] as string[]).includes(value as string)) {
            (result as any)[key] = value;
        }
    });
    return result;
}

interface UnitContextType {
    units: UnitSettings;
    setUnit: <K extends keyof UnitSettings>(key: K, value: UnitSettings[K]) => void;
    resetUnits: () => void;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function UnitProvider({ children }: { children: ReactNode }) {
    const [units, setUnits] = useState<UnitSettings>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return sanitizeUnits(saved ? JSON.parse(saved) : null);
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(units));
    }, [units]);

    const setUnit = <K extends keyof UnitSettings>(key: K, value: UnitSettings[K]) => {
        setUnits((prev) => ({ ...prev, [key]: value}));
    };

    const resetUnits = () => setUnits(DEFAULT_UNITS);

    return(
        <UnitContext.Provider value={{ units, setUnit, resetUnits }}>
            {children}
        </UnitContext.Provider>
    );
}

export function useUnits() {
    const context = useContext(UnitContext);
    if(!context) {
        throw new Error('useUnits must be used within a UnitsProvider');
    }
    return context;
}