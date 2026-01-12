'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Inicializar tema
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Aplicar cambios de tema
  useEffect(() => {
    if (!mounted) return;

    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode, mounted]);

  // Evitar flash antes del mount
  if (!mounted) {
    return <div className="h-8 w-16" />;
  }

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative inline-flex items-center justify-between h-8 w-16 px-1 rounded-full transition-all duration-500 ${
        darkMode ? 'bg-contrast' : 'bg-gray-300'
      }`}
      aria-label="Toggle dark mode"
    >
      <Sun size={16} className="flex-shrink-0 transition-colors text-black relative z-10 ml-1" />
      <span
        className={`absolute inline-block h-6 w-6 transform rounded-full transition-all duration-500 ${
          darkMode ? 'bg-black translate-x-8' : 'bg-white translate-x-0'
        }`}
      />
      <Moon size={16} className={`flex-shrink-0 transition-colors ${darkMode ? 'text-white' : 'text-white'} relative z-10 mr-1`} />
    </button>
  );
}
