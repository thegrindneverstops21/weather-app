import { useLocation } from './components/LocationContext';
import { useWeather } from './hooks/useWeather';
import { DEFAULT_UNITS } from './types/weather';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import CurrentWeather from './components/CurrentWeather';
import './App.css';

function App() {
    const { activeLocation, geolocationLoading } = useLocation();
    const { current, loading, error } = useWeather(activeLocation);

    return (
        <div className="app">
            <header className="app-header">
                <h1 className="app-logo">Weather</h1>
                <div className="app-header-actions">
                    <SearchBar />
                    <ThemeToggle />
                </div>
            </header>

            <main className="app-main">
                {geolocationLoading ? (
                    <p className="app-loading">Getting your location...</p>
                ) : !activeLocation ? (
                    <EmptyState />
                ) : loading && !current ? (
                    <p className="app-loading">Loading weather...</p>
                ) : current ? (
                    <>
                        {error && <p className="app-error-banner">{error}</p>}
                        <CurrentWeather location={activeLocation} weather={current} units={DEFAULT_UNITS} />
                    </>
                ) : (
                    <p className="app-loading">{error ?? 'Something went wrong'}</p>
                )}
            </main>
        </div>
    );
}

export default App;