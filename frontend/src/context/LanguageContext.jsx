import React, { createContext, useContext, useState } from 'react';
import { translations } from '../locales/translations.js';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('skillscan_lang') || localStorage.getItem('careersync_lang');
    return saved && ['en', 'mr', 'hi'].includes(saved) ? saved : 'en';
  });

  const setLanguage = (lang) => {
    if (['en', 'mr', 'hi'].includes(lang)) {
      setLanguageState(lang);
      localStorage.setItem('skillscan_lang', lang);
    }
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageContext;
