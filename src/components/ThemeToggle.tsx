import {Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";
import "./ThemeToggle.css";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        /* button to toggle the theme with an icon indicating the current theme */
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
    )
}