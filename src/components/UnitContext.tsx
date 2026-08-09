import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { DEFAULT_UNITS, type UnitSettings } from "../types/weather";

const STORAGE_KEY = 'weather-app-units';

interface UnitContextType {
    units: UnitSettings;
    setUnit: <K extends keyof UnitSettings>(key: K, value: UnitSettings[K]) => void;
    resetUnits: () => void;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export function UnitProvider({ children }: { children: ReactNode }) {
    const [units, setUnits] = useState<UnitSettings>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : DEFAULT_UNITS;
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