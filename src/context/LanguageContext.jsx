import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../constants/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('language');
            if (stored) return stored;
        }
        return 'tr';
    }); // Default to Turkish

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('language', language);
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'tr' ? 'en' : 'tr'));
    };

    const t = translations[language] || translations['tr'] || {};

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
