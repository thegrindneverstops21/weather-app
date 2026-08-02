import { Search } from 'lucide-react';


interface EmptyStateProps {
    onSearchClick?: () => void;
}

export default function EmptyState({ onSearchClick }: EmptyStateProps) {
    return (
        <div className="empty-state">
            <div className="emptyState-illustration">
                <Search size={64} strokeWidth={1} />
            </div>
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