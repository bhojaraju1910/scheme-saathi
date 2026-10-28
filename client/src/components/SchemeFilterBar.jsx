import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Layers } from 'lucide-react';

export const CATEGORIES = [
  { id: 'all', labelKey: 'schemes.category_all' },
  { id: 'agriculture', labelKey: 'schemes.category_agriculture' },
  { id: 'education', labelKey: 'schemes.category_education' },
  { id: 'healthcare', labelKey: 'schemes.category_healthcare' },
  { id: 'housing', labelKey: 'schemes.category_housing' },
  { id: 'women_empowerment', labelKey: 'schemes.category_women_empowerment' },
  { id: 'social_welfare', labelKey: 'schemes.category_social_welfare' },
  { id: 'employment', labelKey: 'schemes.category_employment' },
  { id: 'financial_inclusion', labelKey: 'schemes.category_financial_inclusion' }
];

export default function SchemeFilterBar({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  levelPref,
  onLevelPrefChange
}) {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-4 space-y-4 transition-colors">
      {/* Top search & level toggle */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search schemes in English, हिंदी, ಕನ್ನಡ..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700 transition"
          />
        </div>

        {/* Level Switcher (WCAG AA Compliant contrast) */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold self-start md:self-auto">
          <span className="text-slate-500 dark:text-slate-400 px-2 flex items-center">
            <Layers className="w-3.5 h-3.5 mr-1" />
          </span>
          <button
            type="button"
            onClick={() => onLevelPrefChange('both')}
            className={`px-3 py-1.5 rounded-lg transition ${
              levelPref === 'both'
                ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 shadow-xs font-black'
                : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
            }`}
          >
            {t('profile.level_both')}
          </button>
          <button
            type="button"
            onClick={() => onLevelPrefChange('central')}
            className={`px-3 py-1.5 rounded-lg transition ${
              levelPref === 'central'
                ? 'bg-orange-800 text-white dark:bg-orange-700 shadow-xs font-black'
                : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
            }`}
          >
            {t('profile.level_central')}
          </button>
          <button
            type="button"
            onClick={() => onLevelPrefChange('state')}
            className={`px-3 py-1.5 rounded-lg transition ${
              levelPref === 'state'
                ? 'bg-emerald-800 text-white dark:bg-emerald-700 shadow-xs font-black'
                : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
            }`}
          >
            {t('profile.level_state')}
          </button>
        </div>
      </div>

      {/* Category Pills horizontal scroll (WCAG AA) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-bold transition-all ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {t(cat.labelKey)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
