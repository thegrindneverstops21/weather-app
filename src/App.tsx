import { useState } from 'react';
import { Cloud } from 'lucide-react';
import { useLocation } from './components/LocationContext';
import { useWeather } from './hooks/useWeather';
import { useUnits } from './components/UnitContext';
import { type ForecastView } from './types/weather';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import CurrentWeather from './components/CurrentWeather';
import DetailsGrid from './components/DetailGrid';
import ForecastToggle from './components/ForecastToggle';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import SettingsPanel from './components/SettingsPanel';
import './App.css';
import SavedLocations from './components/SavedLocations';

function App() {
    const { activeLocation, geolocationLoading } = useLocation();
    const { current, hourly, daily, loading, error } = useWeather(activeLocation);
    const { units } = useUnits();
    const [view, setView] = useState<ForecastView>('hourly');

    return (
        <div className="app">
            <header className="app-header">
                <div className="app-logo-container flex items-center gap-2">
                    <Cloud className="logo" size={50} />
                    <h1 className="app-logo">Cloudy</h1>
                </div>

                <div className="app-header-actions">
                    <SearchBar />
                    <SettingsPanel />
                    <ThemeToggle />
                </div>
            </header>
            <SavedLocations />
            <main className="app-main">
                {geolocationLoading ? (
                    <p className="app-loading">Getting your location...</p>
                ) : !activeLocation ? (
                    <EmptyState />
                ) : loading && !current ? (
                    <p className="app-loading">Loading weather...</p>
                ) : current ? (
                    <div className="app-layout">
                        <div className="app-layout-left">
                            {error && <p className="app-error-banner">{error}</p>}
                            <CurrentWeather location={activeLocation} weather={current} units={units} />
                        </div>

                        <div className="app-layout-right">
                            <ForecastToggle view={view} onChange={setView} />

                            {view === 'hourly' ? (
                                <HourlyForecast hourly={hourly} units={units} />
                            ) : (
                                <DailyForecast daily={daily} units={units} />
                            )}

                            <DetailsGrid
                                current={current}
                                hourlyNow={hourly[0]}
                                dailyToday={daily[0]}
                                units={units}
                            />
                        </div>
                    </div>
                ) : (
                    <p className="app-loading">{error ?? 'Something went wrong'}</p>
                )}
            </main>
        </div>
    );
}

export default App;