import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { searchLocations } from '../services/weatherService';
import { useLocation } from './LocationContext';
import { type Location } from '../types/weather';
import './styles/SearchBar.css';

interface SearchBarProps {
    onLocationSelect?: () => void;
}

export default function SearchBar({ onLocationSelect }: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Location[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const { setActiveLocation } = useLocation();

    /* debounced search: waits 400ms after typing stops before calling the API */
    useEffect(() => {
        if (query.trim().length < 2) {
            setResults([]);
            return;
        }

        setLoading(true);
        const timeoutId = setTimeout(async () => {
            try {
                const raw = await searchLocations(query);
                const mapped: Location[] = raw.map((r: { latitude: number; longitude: number; name: string; country?: string }) => ({
                    id: `${r.latitude}-${r.longitude}`,
                    name: r.name,
                    country: r.country ?? '',
                    latitude: r.latitude,
                    longitude: r.longitude,
                }));
                setResults(mapped);
                setOpen(true);
            } catch (err) {
                console.error('Search failed:', err);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 400);

        return () => clearTimeout(timeoutId);
    }, [query]);// Dependency array, effect runs whenever this value changes

    /* close the dropdown when clicking outside the search bar */
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            // Checks if the element the mouse clicked belongs to the search bar ui
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // A function that adds/saves the location selected by the user
    const handleSelect = (location: Location) => {
        setActiveLocation(location);
        setQuery('');
        setResults([]);
        setOpen(false);
        onLocationSelect?.();
    };

    // A function that clears the search bar when user clears their input
    const handleClear = () => {
        setQuery('');
        setResults([]);
       setOpen(false);
    }; 

    return (
        <div className="search-bar" ref={containerRef}>
            <div className="search-bar-input-wrap">
                <Search size={18} className="search-bar-icon" />
                <input
                    type="text"
                    placeholder="Search for a city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => results.length > 0 && setOpen(true)}
                    className="search-bar-input"
                />
                {query && (
                    <button className="search-bar-clear" onClick={handleClear} aria-label="Clear search">
                        <X size={16} />
                    </button>
                )}
            </div>

            {open && (
                <div className="search-bar-dropdown">
                    {loading && <div className="search-bar-status">Searching...</div>}
                    {!loading && results.length === 0 && query.trim().length >= 2 && (
                        <div className="search-bar-status">No locations found</div>
                    )}
                    {!loading &&
                        results.map((location) => (
                            <button
                                key={location.id}
                                className="search-bar-result"
                                onClick={() => handleSelect(location)}
                            >
                                <span className="search-bar-result-name">{location.name}</span>
                                <span className="search-bar-result-country">{location.country}</span>
                            </button>
                        ))}
                </div>
            )}
        </div>
    );
}