import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  // leitura do localStorage ao iniciar
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
   
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);  

  return (
    <button 
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-xl bg-secondary-button hover:bg-border transition-colors cursor-pointer"
    >
      {isDark ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} className="text-primary" />}
    </button>
  );
};