import { createContext, useContext, useEffect, useState } from 'react';
import { type ReactNode } from 'react';
import { type Location } from '../types/weather';
import { useGeolocation } from '../hooks/useGeolocation';

const STORAGE_KEY = 'weather-app-location';
const ACTIVE_KEY = 'weather-app-active-location';

interface LocationContextType {
    currentLocation: Location | null;
    savedLocations: Location[];
    activeLocation: Location | null;
    setActiveLocation: (location: Location) => void;
    addLocation: (location: Location) => void;
    removeLocation: (id: string) => void;
    geolocationLoading: boolean;
    permissionDenied: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
    const { latitude, longitude, loading, permissionDenied } = useGeolocation();
    const [currentLocation, setCurrentLocation] = useState<Location | null>(null);

    const [savedLocations, setSavedLocations] = useState<Location[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ?  JSON.parse(saved) : [];
    });

    const [activeLocation, setActiveLocationState] = useState<Location | null>(() => {
        const saved = localStorage.getItem(ACTIVE_KEY);
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        if (latitude !== null && longitude !== null) {
            const detected: Location = {
                id: 'current-location', 
                name: 'Current Location',
                country: '',
                latitude,
                longitude,
                isCurrentLocation: true,
            };
            setCurrentLocation(detected);
            setActiveLocationState((prev) => prev ?? detected);
        }
    }, [latitude, longitude]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));
    }, [savedLocations]);

    useEffect(() => {
        if (activeLocation) {
            localStorage.setItem(ACTIVE_KEY, JSON.stringify(activeLocation));
        }
    }, [activeLocation]);

    const setActiveLocation = (location: Location) => {
        setActiveLocationState(location);
    };

    const addLocation = (location: Location) => {
    setSavedLocations((prev) => {
        if(prev.some((l) => l.id === location.id)) return prev;
        return [...prev, location];
    });
    };

    const removeLocation = (id: string) => {
        setSavedLocations((prev) => prev.filter((l) => l.id !== id));
    };

    return (
        <LocationContext.Provider value={{
            currentLocation,
            savedLocations,
            activeLocation,
            setActiveLocation,
            addLocation,
            removeLocation,
            geolocationLoading: loading,
            permissionDenied,
        }}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
}