import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SchemeCard({ scheme, onSelect }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || 'en';

  const name = scheme.name?.[lang] || scheme.name?.en || 'Government Scheme';
  const description = scheme.shortDescription?.[lang] || scheme.shortDescription?.en || '';
  const benefits = scheme.benefits?.[lang] || scheme.benefits?.en || '';
  const docs = scheme.documentsRequired || [];

  const isCentral = scheme.level === 'central';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top Banner & Category */}
      <div className="p-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Level Badge (WCAG AA Compliant) */}
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide uppercase ${
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

          {/* Category Tag */}
          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-md capitalize border border-slate-200 dark:border-slate-700">
            {t(`schemes.category_${scheme.category}`, scheme.category)}
          </span>
        </div>

        {/* Scheme Name */}
        <h3 className="font-extrabold text-base sm:text-lg text-slate-950 dark:text-white leading-snug group-hover:text-orange-800 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
          {name}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Benefits Highlight Box */}
        <div className="mt-4 p-3 bg-orange-50/80 dark:bg-orange-950/40 rounded-xl border border-orange-200 dark:border-orange-900/60">
          <p className="text-[11px] font-black text-orange-950 dark:text-orange-300 uppercase tracking-wider mb-1 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-orange-800 dark:text-orange-400" />
            {t('schemes.benefits_heading')}
          </p>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2 leading-relaxed">
            {benefits}
          </p>
        </div>

        {/* Eligibility Criteria Tags (WCAG AA) */}
        <div className="mt-4 flex flex-wrap gap-1.5 text-[11px]">
          {/* Age tag */}
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700">
            Age:{' '}
            {scheme.minAge != null || scheme.maxAge != null
              ? `${scheme.minAge ?? 0} - ${scheme.maxAge ?? 'No limit'}`
              : t('schemes.unrestricted')}
          </span>

          {/* Income tag */}
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700">
            Income:{' '}
            {scheme.maxIncome != null
              ? `≤ ₹${scheme.maxIncome.toLocaleString('en-IN')}`
              : t('schemes.unrestricted')}
          </span>

          {/* Gender tag */}
          {scheme.genders && scheme.genders.length > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-rose-950 dark:text-rose-200 font-bold border border-rose-300 dark:border-rose-800">
              {scheme.genders.map((g) => t(`profile.gender_${g}`, g)).join(', ')}
            </span>
          )}

          {/* Occupation tag */}
          {scheme.occupations && scheme.occupations.length > 0 && (
            <span className="px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-950 dark:text-sky-200 font-bold border border-sky-300 dark:border-sky-800">
              {scheme.occupations.map((o) => t(`profile.occ_${o}`, o)).join(', ')}
            </span>
          )}

          {/* Disability tag */}
          {scheme.disabilityRequired && (
            <span className="px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-950 dark:text-purple-200 font-bold border border-purple-300 dark:border-purple-800">
              {t('schemes.disability_tag')}
            </span>
          )}
        </div>

        {/* Documents preview */}
        {docs.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              {t('schemes.docs_required')}:
            </p>
            <div className="flex flex-wrap gap-1">
              {docs.slice(0, 2).map((doc, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 truncate max-w-[200px]"
                >
                  {doc[lang] || doc.en}
                </span>
              ))}
              {docs.length > 2 && (
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-bold self-center">
                  +{docs.length - 2} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onSelect(scheme)}
          className="text-xs font-black text-slate-800 dark:text-slate-200 hover:text-orange-800 dark:hover:text-orange-400 flex items-center space-x-1 py-1 px-2 rounded-lg hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
        >
          <span>{t('schemes.view_details')}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {scheme.level === 'karnataka' ? (
          <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300">Karnataka State</span>
        ) : (
          <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300">Government of India</span>
        )}

        {(scheme.applyLink || scheme.portalUrl) && (
          <a
            href={scheme.applyLink || scheme.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition shadow-2xs"
          >
            <span>Apply</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        )}
      </div>
    </div>
  );
}
