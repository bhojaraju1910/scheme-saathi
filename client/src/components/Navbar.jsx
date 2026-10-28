import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import {
  ShieldCheck,
  User as UserIcon,
  LogOut,
  Database,
  SlidersHorizontal,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ onOpenAuth, onToggleProfileDrawer }) {
  const { t } = useTranslation();
  const { user, logout, apiMode, switchApiMode } = useAuth();

  // Dark/Light Theme state
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('scheme_saathi_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Font Size state: 'small' (A-), 'normal' (A), 'large' (A+)
  const [fontSize, setFontSize] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('scheme_saathi_fontsize') || 'normal';
    }
    return 'normal';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('scheme_saathi_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('scheme_saathi_theme', 'light');
    }
  }, [isDark]);

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  const handleChangeFontSize = (size) => {
    setFontSize(size);
    document.documentElement.setAttribute('data-font-size', size);
    localStorage.setItem('scheme_saathi_fontsize', size);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      {/* Tricolor top border indicator */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-white to-emerald-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-700 flex items-center justify-center text-white shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center flex-wrap gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-950 dark:text-white tracking-tight">
                  {t('app_name')}
                </span>
                {/* Independent Citizen Initiative Badge (WCAG AA compliant) */}
                <span className="inline-flex text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800">
                  {t('nav.initiative_badge')}
                </span>
              </div>
              {/* Wrapped, non-truncated clean tagline */}
              <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 hidden sm:block leading-snug max-w-sm lg:max-w-md mt-0.5">
                {t('tagline')}
              </p>
            </div>
          </div>

          {/* Right Navigation & Accessibility Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            {/* Font Size Controls (A- / A / A+) */}
            <div
              className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-300 dark:border-slate-700"
              title={t('nav.font_size')}
              role="group"
              aria-label="Font size controls"
            >
              <button
                type="button"
                onClick={() => handleChangeFontSize('small')}
                className={`px-1.5 py-0.5 text-[11px] font-bold rounded transition-colors ${
                  fontSize === 'small'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Small text"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => handleChangeFontSize('normal')}
                className={`px-1.5 py-0.5 text-xs font-bold rounded transition-colors ${
                  fontSize === 'normal'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Normal text"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => handleChangeFontSize('large')}
                className={`px-1.5 py-0.5 text-sm font-bold rounded transition-colors ${
                  fontSize === 'large'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-2xs'
                    : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
                }`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={handleToggleTheme}
              className="p-1.5 rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors"
              title={isDark ? t('nav.theme_light') : t('nav.theme_dark')}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            {/* Language Selector */}
            <LanguageSwitcher />

            {/* API Mode Indicator (Hidden unless import.meta.env.DEV is true) */}
            {import.meta.env.DEV && (
              <button
                type="button"
                onClick={() => switchApiMode(apiMode === 'real' ? 'mock' : 'real')}
                className={`hidden xl:inline-flex items-center space-x-1 px-2 py-1 rounded-md text-[11px] font-bold border transition-all ${
                  apiMode === 'real'
                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-800'
                    : 'bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800'
                }`}
                title="Dev Mode: Click to toggle API source"
              >
                <Database className="w-3 h-3" />
                <span>{apiMode === 'real' ? 'Dev: Mongo' : 'Dev: Mock'}</span>
              </button>
            )}

            {/* Show "My Profile" button ONLY when user is logged in */}
            {user && (
              <button
                type="button"
                onClick={onToggleProfileDrawer}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors"
                title="Edit My Profile"
              >
                <SlidersHorizontal className="w-4 h-4 text-slate-700 dark:text-slate-300" />
                <span className="hidden sm:inline">{t('nav.profile')}</span>
              </button>
            )}

            {/* Auth section */}
            {user ? (
              <div className="flex items-center space-x-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-950 border border-orange-300 dark:border-orange-800 flex items-center justify-center text-orange-900 dark:text-orange-200 font-bold text-xs">
                  {user.name?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="hidden lg:block text-left text-xs">
                  <p className="font-bold text-slate-900 dark:text-slate-100 truncate max-w-[120px]">
                    {user.name}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-[10px] truncate max-w-[120px]">
                    {user.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                  title={t('nav.logout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenAuth}
                className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-bold rounded-lg text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-xs transition-all"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>{t('nav.login')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
