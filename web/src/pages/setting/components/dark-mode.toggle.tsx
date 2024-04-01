import { Toggle } from 'konsta/react';
import { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.getElementById('theme')!.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <Toggle checked={theme === 'dark'} onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
    </>
  );
};

export default DarkModeToggle;
