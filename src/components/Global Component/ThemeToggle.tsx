import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();
  return <button type="button" onClick={toggleDarkMode} className={`grid h-9 w-9 place-items-center rounded-lg transition-colors ${darkMode ? 'text-amber-300 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'}`} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>{darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button>;
}
