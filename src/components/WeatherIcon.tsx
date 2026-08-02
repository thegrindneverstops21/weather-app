import {
    Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudRainWind, CloudSnow, CloudLightning, HelpCircle
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
    Sun, Moon, CloudSun, CloudMoon, Cloud, CloudFog, CloudDrizzle, CloudRain, CloudRainWind, CloudSnow, CloudLightning,
};

interface WeatherIconProps {
    icon: string;
    size?: number;
    className?: string;
}

export default function WeatherIcon({ icon, size = 24, className }: WeatherIconProps) {
    const Icon = ICON_MAP[icon] || HelpCircle;
    return <Icon size={size} className={className} />;
}