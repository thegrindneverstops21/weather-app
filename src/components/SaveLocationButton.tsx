import { Bookmark } from "lucide-react";
import { useLocation } from "./LocationContext";
import { type Location } from "../types/weather";
import './styles/SaveLocationButton.css'

interface SaveLocationButtonProps {
    location: Location;
}

export default function SaveLocationButton({ location } : SaveLocationButtonProps ){
    const {savedLocations, addLocation, removeLocation } = useLocation();

    if(location.isCurrentLocation) return null;

    const isSaved = savedLocations.some((l) => l.id === location.id);

    const toggleSave = () => {
        if(isSaved) {
            removeLocation(location.id);
        } else {
            addLocation(location);
        }
    };

    return (
        <button 
            className={`save-location-btn ${isSaved ? 'active' : ''}`}
            onClick={toggleSave}
            aria-label={isSaved ? 'Remove from saved locations' : 'Save location'} >
                <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
            </button>
    )

}