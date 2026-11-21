import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeMode = 'dark' | 'light' | 'system';
export type ResolvedTheme = 'dark' | 'light';

export interface ThemeColors {
  background: string;       // Main Application Canvas
  surface: string;          // Cards and popovers
  elevated: string;         // Dropdowns, modals
  pushUnderlayer: string;   // Background layer behind sidebar
  sidebarGlass: string;     // Solid sidebar surface (kept property name for compatibility)
  primaryText: string;      // High contrast text
  mutedText: string;        // Secondary text
  border: string;           // Standard crisp border
  borderSubtle: string;     // Secondary border
  accent: string;           // Primary Neubrutalist yellow
  highlight: string;        // Coral accent
}

export const DARK_THEME_COLORS: ThemeColors = {
  background: '#0D1017',
  surface: '#161B26',
  elevated: '#1E2534',
  pushUnderlayer: '#161B26',
  sidebarGlass: '#0D1017',
  primaryText: '#F4F1E8',
  mutedText: '#9AA6BE',
  border: '#3D475E',
  borderSubtle: '#2B3347',
  accent: '#FFD84D',
  highlight: '#FF8A65',
};

export const LIGHT_THEME_COLORS: ThemeColors = {
  background: '#FFFDF5',
  surface: '#FFFFFF',
  elevated: '#FFF7DC',
  pushUnderlayer: '#FFD84D',
  sidebarGlass: '#FFFDF5',
  primaryText: '#171717',
  mutedText: '#404040',
  border: '#171717',
  borderSubtle: '#171717',
  accent: '#FFD84D',
  highlight: '#FF8A65',
};

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  colors: ThemeColors;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'uniflow_theme_preference';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === 'dark' || saved === 'light' || saved === 'system') {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
    return 'light';
  });

  const [systemIsDark, setSystemIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => {
      setSystemIsDark(e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const resolvedTheme: ResolvedTheme = theme === 'system'
    ? (systemIsDark ? 'dark' : 'light')
    : theme;

  const colors = resolvedTheme === 'dark' ? DARK_THEME_COLORS : LIGHT_THEME_COLORS;

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        colors,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
