import { X, Settings } from 'lucide-react';
import type { UnitSettings } from '../types/weather';
import { useState } from 'react';
import { useUnits } from './UnitContext';
import './styles/SettingPanel.css';


interface UnitOption<K extends keyof UnitSettings> {
    key: K;
    label: string;
    options: { value: UnitSettings[K]; label: string }[];
}

const UNIT_OPTIONS: UnitOption<keyof UnitSettings>[] = [
    {
        key: 'temperature',
        label: 'Temperature',
        options: [
            { value: 'C', label: '°C' },
            { value: 'F', label: '°F' },
        ],
    },
    {
        key: 'windSpeed',
        label: 'Wind Speed',
        options: [
            { value: 'km/h', label: 'km/h' },
            { value: 'mph', label: 'mph' },
        ],
    },
    {
        key: 'pressure',
        label: 'Pressure',
        options: [
            { value: 'hPa', label: 'hPa' },
            { value: 'inHg', label: 'inHg' },
        ],
    },
    {
        key: 'visibility',
        label: 'Visibility',
        options: [
            { value: 'km', label: 'km' },
            { value: 'mi', label: 'mi' },
    ],
},
    {
        key: 'precipitation',
        label: 'Precipitation',
        options: [
            { value: 'mm', label: 'mm' },
            { value: 'in', label: 'in' },
        ],
    },
];

export default function SettingsPanel() {
    const [ open, setOpen ] = useState(false);
    const { units, setUnit } = useUnits();

    return (
        <>
            <button className='settings-trigger' onClick={() => setOpen(true)} aria-label='Open Settings'>
                <Settings size={18} />
            </button>

            {open && (
                <div className="setting-overlay" onClick={() => setOpen(false)}>
                    <div className='setting-panel' onClick={(e) => e.stopPropagation()}>
                        <div className='settings-panel-header'>
                            <h2>Settings</h2>
                            <button className='settings-close' onClick={() => setOpen(false)} aria-label='Close Settings'>
                                <X size={18} />
                            </button>
                        </div>

                        <div className='settings-panel-body'>
                            {UNIT_OPTIONS.map((group) => (
                                <div key={group.key} className='settings-row'>
                                    <span className='setting-row-label'>{group.label}</span>
                                    <div className='setting-row-pills'>
                                        {group.options.map((opt) => (
                                            <button key={String(opt.value)} className={`setting-pill ${units[group.key] === opt.value ? 'active' : ''}`} onClick={() => setUnit(group.key, opt.value)} >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}