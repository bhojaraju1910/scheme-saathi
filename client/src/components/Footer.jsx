import React from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-16 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      {/* Tricolor accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-white to-emerald-700"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Prominent Non-Government Disclaimer Banner (WCAG AA compliant) */}
        <div className="mb-8 p-4 rounded-xl bg-amber-50 dark:bg-slate-800/80 border border-amber-300 dark:border-amber-800 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
            <span className="font-bold block mb-1">
              {t('footer.official_disclaimer')}
            </span>
            <p className="text-amber-900 dark:text-amber-300">
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <ShieldCheck className="w-5 h-5 text-orange-700 dark:text-orange-400" />
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                {t('app_name')}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
              {t('tagline')}
            </p>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 text-center md:text-right">
            <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center md:justify-end">
              <span>{t('footer.proudly_indian')}</span>
              <span className="ml-1.5 inline-block">🇮🇳</span>
            </p>
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
