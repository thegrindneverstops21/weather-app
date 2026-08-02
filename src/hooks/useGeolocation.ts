import { useState, useEffect } from 'react';

interface GeolocationState {
    latitude: number | null;
    longitude: number | null;
    loading: boolean;
    error: string | null;
    permissionDenied: boolean;
}

export function useGeolocation() {
    const [state, setState] = useState<GeolocationState>({
        latitude: null,
        longitude: null,
        loading: true,
        error: null,
        permissionDenied: false,
    });

    useEffect(() => {
        if (!navigator.geolocation) {
            setState({
                latitude: null,
                longitude: null,
                loading: false,
                error: 'Geolocation is not supported by your browser',
                permissionDenied: false,
            });
            return;
        }
    
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    loading: false,
                    error: null,
                    permissionDenied: false,
                });
            },
            (error) => {
                setState({
                    latitude: null,
                    longitude: null,
                    loading: false,
                    error: error.message,
                    permissionDenied: error.code === error.PERMISSION_DENIED,
                });
            },
            {
                enableHighAccuracy: false,
                timeout: 10000,
                maximumAge: 5 * 60 * 1000,
            }
        );
    }, []);
    return state;
}