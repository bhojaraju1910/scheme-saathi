import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { X, ExternalLink, CheckCircle, FileCheck, ShieldCheck } from 'lucide-react';

export default function SchemeDetailsModal({ scheme, onClose }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!scheme) return null;

  const name = scheme.name?.[lang] || scheme.name?.en || 'Government Scheme';
  const description = scheme.shortDescription?.[lang] || scheme.shortDescription?.en || '';
  const benefits = scheme.benefits?.[lang] || scheme.benefits?.en || '';
  const docs = scheme.documentsRequired || [];
  const isCentral = scheme.level === 'central';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 relative flex flex-col transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-4 sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur z-10">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                  isCentral
                    ? 'bg-amber-100 dark:bg-amber-950 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                    : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                {isCentral
                  ? t('schemes.level_tag_central')
                  : `${t('schemes.level_tag_state')} (${scheme.applicableStates?.join(', ') || 'State'})`}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">
                {t(`schemes.category_${scheme.category}`, scheme.category)}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white leading-tight">
              {name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
              Overview
            </h4>
            <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {description}
            </p>
          </div>

          {/* Benefits Box */}
          <div className="p-4 bg-orange-50/80 dark:bg-orange-950/40 rounded-2xl border border-orange-200 dark:border-orange-900/60">
            <h4 className="text-xs font-black text-orange-950 dark:text-orange-300 uppercase tracking-wider mb-2 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1.5 text-orange-800 dark:text-orange-400" />
              {t('schemes.benefits_heading')}
            </h4>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
              {benefits}
            </p>
          </div>

          {/* Criteria Breakdown Grid */}
          <div>
            <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3">
              {t('schemes.limits_summary')}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">{t('schemes.min_age')} / {t('schemes.max_age')}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {scheme.minAge != null ? `${scheme.minAge} yrs` : 'None'} -{' '}
                  {scheme.maxAge != null ? `${scheme.maxAge} yrs` : 'No max'}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">{t('schemes.max_income')}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {scheme.maxIncome != null
                    ? `≤ ₹${scheme.maxIncome.toLocaleString('en-IN')}`
                    : t('schemes.unrestricted')}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">{t('schemes.allowed_genders')}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {scheme.genders?.length
                    ? scheme.genders.map((g) => t(`profile.gender_${g}`, g)).join(', ')
                    : t('schemes.unrestricted')}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">{t('schemes.allowed_castes')}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {scheme.castes?.length
                    ? scheme.castes.map((c) => t(`profile.caste_${c}`, c)).join(', ')
                    : t('schemes.unrestricted')}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">{t('schemes.allowed_occupations')}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {scheme.occupations?.length
                    ? scheme.occupations.map((o) => t(`profile.occ_${o}`, o)).join(', ')
                    : t('schemes.unrestricted')}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400 block mb-1 font-semibold">{t('profile.disability')}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {scheme.disabilityRequired
                    ? 'Required (>40%)'
                    : t('schemes.unrestricted')}
                </span>
              </div>
            </div>
          </div>

          {/* Required Documents List */}
          {docs.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center">
                <FileCheck className="w-4 h-4 mr-1.5 text-slate-700 dark:text-slate-300" />
                {t('schemes.docs_required')}
              </h4>
              <ul className="space-y-2">
                {docs.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-center text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700"
                  >
                    <span className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-200 flex items-center justify-center font-bold text-[10px] mr-2.5 shrink-0 border border-orange-200 dark:border-orange-800">
                      {idx + 1}
                    </span>
                    <span className="font-semibold">{doc[lang] || doc.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Source verification and last verified */}
          <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800">
            {scheme.lastVerified && (
              <span>Verified: {scheme.lastVerified}</span>
            )}
            {scheme.sourceUrl && (
              <a
                href={scheme.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-slate-800 dark:hover:text-slate-200"
              >
                Official Source (myscheme.gov.in / department)
              </a>
            )}
          </div>
        </div>

        {/* Modal Footer (WCAG AA Compliant Button) */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800 transition"
          >
            {t('schemes.modal_close')}
          </button>

          {(scheme.applyLink || scheme.portalUrl) && (
            <a
              href={scheme.applyLink || scheme.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white shadow-md transition"
            >
              <span>{t('schemes.apply_online')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
