import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Check local storage or system preference
    const getInitialTheme = () => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme && savedTheme !== 'system') {
                return savedTheme;
            }
            // System preference
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                return 'dark';
            }
        }
        return 'dark';
    };

    const [themePreference, setThemePreference] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'system';
        }
        return 'system';
    });

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        const root = window.document.documentElement;
        
        let actualTheme = themePreference;
        if (themePreference === 'system') {
            actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        
        if (actualTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        setTheme(actualTheme);
        localStorage.setItem('theme', themePreference);
    }, [themePreference]);

    // Listen for system theme changes
    useEffect(() => {
        if (themePreference !== 'system') return;
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => {
            const root = window.document.documentElement;
            if (e.matches) {
                root.classList.add('dark');
                setTheme('dark');
            } else {
                root.classList.remove('dark');
                setTheme('light');
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [themePreference]);

    const toggleTheme = () => {
        setThemePreference((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: setThemePreference, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
