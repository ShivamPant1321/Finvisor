import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-var(--hover-bg) transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MdDarkMode size={24} />
      ) : (
        <MdLightMode size={24} />
      )}
    </button>
  );
};

export default ThemeToggle;
