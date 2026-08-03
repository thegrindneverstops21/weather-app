import location from "../assets/location.png"
import './styles/EmptyState.css';

interface EmptyStateProps {
    onSearchClick?: () => void;
}

export default function EmptyState({ onSearchClick }: EmptyStateProps) {
    return (
        <div className="empty-state">
            <img src={location} alt="No location selected" className="empty-state-illustration" />
            <h2 className="empty-state-title">No Locations Selected</h2>
            <p className="empty-state-text">Please add a location to view the weather information.</p>
            {onSearchClick && (
                <button className="empty-state-button" onClick={onSearchClick}>
                    Search for Locations
                </button>
            )}
        </div>
    );
}