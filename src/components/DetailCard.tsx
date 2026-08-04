import { type ReactNode } from 'react';
import WeatherIcon from './WeatherIcon';
import './styles/DetailCard.css';

interface DetailCardProps {
    icon: string; // lucide icon name, resolved by WeatherIcon
    label: string;
    value?: string;
    unit?: string;
    subtitle?: string;
    children?: ReactNode; // for custom content like Sun/Moon cards
}

export default function DetailCard({ icon, label, value, unit, subtitle, children }: DetailCardProps) {
    return (
        <div className="detail-card">
            <div className="detail-card-header">
                <WeatherIcon icon={icon} size={18} />
                <span className="detail-card-label">{label}</span>
            </div>

            {children ? (
                <div className="detail-card-custom">{children}</div>
            ) : (
                <div className="detail-card-value">
                    {value}
                    {unit && <span className="detail-card-unit">{unit}</span>}
                </div>
            )}

            {subtitle && <div className="detail-card-subtitle">{subtitle}</div>}
        </div>
    );
}