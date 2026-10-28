import React from 'react';
import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' }
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('scheme_saathi_lang', langCode);
  };

  return (
    <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-0.5 shadow-2xs">
      <Languages className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400 ml-1.5 hidden sm:block" />
      <div className="flex space-x-0.5">
        {languages.map((lang) => {
          const isActive = i18n.language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={`px-2 py-1 text-xs font-bold rounded-md transition-all duration-150 ${
                isActive
                  ? 'bg-orange-800 text-white shadow-2xs font-extrabold'
                  : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={lang.label}
            >
              {lang.native}
            </button>
          );
        })}
      </div>
    </div>
  );
}
