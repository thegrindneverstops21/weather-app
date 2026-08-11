import { MapPin, X } from "lucide-react";
import { useLocation } from "./LocationContext";
import { type Location } from "../types/weather";
import './styles/SavedLocations.css'

export default function SavedLocations() {
    const { currentLocation, savedLocations, activeLocation, setActiveLocation, removeLocation } = useLocation();

    const chips: Location[] = currentLocation ? [currentLocation, ...savedLocations.filter((l) => l.id !== currentLocation.id)] : savedLocations;

    if (chips.length === 0) return null;

    return (
        <div className="saved-locations">
            {chips.map((loc) => {
                const isActive = activeLocation?.id === loc.id;
                const isCurrent = loc.isCurrentLocation;

                return (
                    <button key={loc.id} className={`location-chip ${isActive ? 'active' : ''}`} onClick={() => setActiveLocation(loc)}>
                        {isCurrent && <MapPin size={14} />}
                        <span>{loc.name}</span>
                        {!isCurrent && (
                            <span className="location-chip-remove" role="button" aria-label={`Remove ${loc.name}`} onClick={(e) => {
                                e.stopPropagation(); removeLocation(loc.id);
                                if (isActive && currentLocation) {
                                    setActiveLocation(currentLocation);
                                }
                            }}>
                                <X size={12} />
                            </span>
                        )}
                    </button>
                )
            })}
        </div>
    )

}