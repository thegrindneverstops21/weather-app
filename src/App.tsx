import { useLocation } from './components/LocationContext';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import './App.css';

function App() {
    const { activeLocation, geolocationLoading } = useLocation();

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
                ) : activeLocation ? (
                    <p>Active location: {activeLocation.name}</p>
                ) : (
                    <EmptyState />
                )}
            </main>
        </div>
    );
}

export default App;