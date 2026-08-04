import { useEffect, useState } from "react";
import type {
  Location,
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from "../types/weather";
import {
  fetchWeatherData,
  mapCurrentWeather,
  mapDailyWeather,
  mapHourlyWeather,
} from "../services/weatherService";

interface WeatherState {
  current: CurrentWeather | null;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  loading: boolean;
  error: string | null;
  isFromCache: boolean;
}

interface CachedWeather {
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  fetchedAt: number;
}

const CACHE_PREFIX = "weather-app-cache";
const CACHE_AGE_MAX = 30 * 60 * 100;

function getCacheKey(location: Location) {
  return `${CACHE_PREFIX}${location.latitude.toFixed(2)}-${location.longitude.toFixed(2)}`;
}

function readCache(location: Location): CachedWeather | null {
  try {
    const raw = localStorage.getItem(getCacheKey(location));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(
  location: Location,
  data: Omit<CachedWeather, "fetchedAt">,
) {
  const payload: CachedWeather = { ...data, fetchedAt: Date.now() };
  localStorage.setItem(getCacheKey(location), JSON.stringify(payload));
}

export function useWeather(location: Location | null) {
  const [state, setState] = useState<WeatherState>({
    current: null,
    hourly: [],
    daily: [],
    loading: true,
    error: null,
    isFromCache: false,
  });

  useEffect(() => {
    if (!location) {
      setState({
        current: null,
        hourly: [],
        daily: [],
        loading: false,
        error: null,
        isFromCache: false,
      });
      return;
    }

    const currentLocation = location;
    let cancelled = false;

    async function load() {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const cached = readCache(currentLocation);
      if (cached && !cancelled) {
        setState({
          current: cached.current,
          hourly: cached.hourly,
          daily: cached.daily,
          loading: false,
          error: null,
          isFromCache: true,
        });
      }

      try {
        const raw = await fetchWeatherData(
          currentLocation.latitude,
          currentLocation.longitude,
        );
        if (cancelled) return;

        const current = mapCurrentWeather(raw);
        const hourly = mapHourlyWeather(raw);
        const daily = mapDailyWeather(raw);

        writeCache(currentLocation, { current, hourly, daily });

        if (cancelled) return;
        setState({
          current,
          hourly,
          daily,
          loading: false,
          error: null,
          isFromCache: false,
        });
      } catch (err) {
        if (cancelled) return;

        if (cached) {
          setState((prev) => ({
            ...prev,
            loading: false,
            error: "Showing cached data, failed to refresh",
          }));
        } else {
          setState({
            current: null,
            hourly: [],
            daily: [],
            loading: false,
            error:
              err instanceof Error
                ? err.message
                : "Failed to load weather data",
            isFromCache: false,
          });
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [location?.latitude, location?.longitude]);

  return state;
}
