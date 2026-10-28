import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  RotateCcw,
  Check,
  MapPin,
  IndianRupee,
  Briefcase,
  HeartHandshake,
  Layers,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

// Helper to format Indian currency with digit grouping
export function formatIndianCurrency(num) {
  if (num === '' || num == null || isNaN(Number(num))) return '';
  return new Intl.NumberFormat('en-IN').format(Number(num));
}

export default function ProfileForm({ onProfileChanged }) {
  const { t } = useTranslation();
  const { activeProfile, updateProfile, setDemoProfile } = useAuth();

  // Form starts EMPTY by default
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    state: '',
    annualIncome: '',
    casteCategory: '',
    occupation: '',
    disability: '',
    schemeLevelPref: 'both'
  });

  const [showSampleProfiles, setShowSampleProfiles] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Stepper state for screens below 640px (1, 2, or 3)
  const [mobileStep, setMobileStep] = useState(1);

  useEffect(() => {
    if (activeProfile) {
      setFormData({
        age: activeProfile.age != null ? activeProfile.age : '',
        gender: activeProfile.gender || '',
        state: activeProfile.state || '',
        annualIncome: activeProfile.annualIncome != null ? activeProfile.annualIncome : '',
        casteCategory: activeProfile.casteCategory || '',
        occupation: activeProfile.occupation || '',
        disability: activeProfile.disability || '',
        schemeLevelPref: activeProfile.schemeLevelPref || 'both'
      });
    }
  }, [activeProfile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    await updateProfile(formData);
    setSavedSuccess(true);
    if (onProfileChanged) onProfileChanged(formData);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleReset = () => {
    const resetValues = {
      age: '',
      gender: '',
      state: '',
      annualIncome: '',
      casteCategory: '',
      occupation: '',
      disability: '',
      schemeLevelPref: 'both'
    };
    setFormData(resetValues);
    updateProfile(resetValues);
    if (onProfileChanged) onProfileChanged(resetValues);
  };

  const handleApplyDemo = (type) => {
    setDemoProfile(type);
    setShowSampleProfiles(false);
  };

  // Indian digit grouping preview for income
  const incomeFormatted = formatIndianCurrency(formData.annualIncome);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 sm:p-6 transition-colors">
      {/* Header and Sample Profiles Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            {t('profile.title')}
          </h2>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5 leading-relaxed">
            {t('profile.subtitle')}
          </p>
        </div>

        {/* "Try a sample profile" Link (Hidden behind toggle) */}
        <div>
          <button
            type="button"
            onClick={() => setShowSampleProfiles(!showSampleProfiles)}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-orange-800 dark:text-orange-300 hover:text-orange-950 dark:hover:text-orange-200 bg-orange-50 dark:bg-orange-950/60 hover:bg-orange-100 dark:hover:bg-orange-900/60 px-3 py-1.5 rounded-lg border border-orange-300 dark:border-orange-800 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-700 dark:text-orange-400" />
            <span>{showSampleProfiles ? t('profile.hide_sample') : t('profile.try_sample')}</span>
            {showSampleProfiles ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Sample Profiles (WCAG AA compliant colors) */}
      {showSampleProfiles && (
        <div className="mt-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 animate-fade-in">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
            Select a sample profile to auto-fill criteria:
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleApplyDemo('farmer')}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-800 hover:bg-amber-200 dark:hover:bg-amber-900 font-bold transition"
            >
              🌾 {t('profile.occ_farmer')} (Karnataka)
            </button>
            <button
              type="button"
              onClick={() => handleApplyDemo('woman')}
              className="text-xs px-3 py-1.5 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-950 dark:text-rose-200 border border-rose-300 dark:border-rose-800 hover:bg-rose-200 dark:hover:bg-rose-900 font-bold transition"
            >
              👩 {t('profile.occ_artisan')} (Woman)
            </button>
            <button
              type="button"
              onClick={() => handleApplyDemo('student')}
              className="text-xs px-3 py-1.5 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-950 dark:text-sky-200 border border-sky-300 dark:border-sky-800 hover:bg-sky-200 dark:hover:bg-sky-900 font-bold transition"
            >
              🎓 {t('profile.occ_student')} (SC/ST)
            </button>
            <button
              type="button"
              onClick={() => handleApplyDemo('disability')}
              className="text-xs px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-950 dark:text-purple-200 border border-purple-300 dark:border-purple-800 hover:bg-purple-200 dark:hover:bg-purple-900 font-bold transition"
            >
              ♿ Person with Disability
            </button>
          </div>
        </div>
      )}

      {/* Clarified Helper Note about Blank Fields */}
      <div className="mt-3 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-start space-x-2 text-xs text-blue-950 dark:text-blue-200">
        <Info className="w-4 h-4 text-blue-700 dark:text-blue-400 shrink-0 mt-0.5" />
        <span className="leading-relaxed">
          {t('profile.blank_helper')}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        {/* ============================================================== */}
        {/* MOBILE STEPPER VIEW (Below 640px, sm:hidden)                    */}
        {/* ============================================================== */}
        <div className="block sm:hidden">
          {/* Stepper Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              <span>
                {t('profile.step_of', { current: mobileStep, total: 3 })}: {' '}
                {mobileStep === 1
                  ? t('profile.step1_title')
                  : mobileStep === 2
                  ? t('profile.step2_title')
                  : t('profile.step3_title')}
              </span>
              <span>{Math.round((mobileStep / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div
                className="bg-orange-700 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(mobileStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step 1: Personal Details */}
          {mobileStep === 1 && (
            <div className="space-y-3 animate-fade-in">
              {/* Age */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {t('profile.age')}
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  max="120"
                  placeholder={t('profile.age_placeholder')}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {t('profile.gender')}
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                >
                  <option value="">{t('profile.gender_placeholder')}</option>
                  <option value="male">{t('profile.gender_male')}</option>
                  <option value="female">{t('profile.gender_female')}</option>
                  <option value="transgender">{t('profile.gender_transgender')}</option>
                  <option value="other">{t('profile.gender_other')}</option>
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                  {t('profile.state')}
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                >
                  <option value="">{t('profile.select_state')}</option>
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Step 2: Financial & Social Category */}
          {mobileStep === 2 && (
            <div className="space-y-3 animate-fade-in">
              {/* Annual Income with Indian Digit Grouping */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center justify-between">
                  <span className="flex items-center">
                    <IndianRupee className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                    {t('profile.annual_income')}
                  </span>
                  {incomeFormatted && (
                    <span className="font-extrabold text-orange-800 dark:text-orange-300 text-xs">
                      ₹ {incomeFormatted}
                    </span>
                  )}
                </label>
                <input
                  type="number"
                  name="annualIncome"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  min="0"
                  step="5000"
                  placeholder={t('profile.income_placeholder')}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                />
              </div>

              {/* Caste Category */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {t('profile.caste')}
                </label>
                <select
                  name="casteCategory"
                  value={formData.casteCategory}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                >
                  <option value="">{t('profile.caste_placeholder')}</option>
                  <option value="general">{t('profile.caste_general')}</option>
                  <option value="obc">{t('profile.caste_obc')}</option>
                  <option value="sc">{t('profile.caste_sc')}</option>
                  <option value="st">{t('profile.caste_st')}</option>
                  <option value="ews">{t('profile.caste_ews')}</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Livelihood & Scheme Scope */}
          {mobileStep === 3 && (
            <div className="space-y-3 animate-fade-in">
              {/* Occupation */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center">
                  <Briefcase className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                  {t('profile.occupation')}
                </label>
                <select
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                >
                  <option value="">{t('profile.occ_placeholder')}</option>
                  <option value="farmer">{t('profile.occ_farmer')}</option>
                  <option value="student">{t('profile.occ_student')}</option>
                  <option value="unemployed">{t('profile.occ_unemployed')}</option>
                  <option value="artisan">{t('profile.occ_artisan')}</option>
                  <option value="street_vendor">{t('profile.occ_street_vendor')}</option>
                  <option value="salaried">{t('profile.occ_salaried')}</option>
                  <option value="daily_wage">{t('profile.occ_daily_wage')}</option>
                  <option value="retired">{t('profile.occ_retired')}</option>
                  <option value="homemaker">{t('profile.occ_homemaker')}</option>
                  <option value="entrepreneur">{t('profile.occ_entrepreneur')}</option>
                </select>
              </div>

              {/* Disability Status */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center">
                  <HeartHandshake className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                  {t('profile.disability')}
                </label>
                <select
                  name="disability"
                  value={formData.disability}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                >
                  <option value="">{t('profile.disability_placeholder')}</option>
                  <option value="none">{t('profile.disability_none')}</option>
                  <option value="locomotor">{t('profile.disability_locomotor')}</option>
                  <option value="visual">{t('profile.disability_visual')}</option>
                  <option value="hearing">{t('profile.disability_hearing')}</option>
                  <option value="other">{t('profile.disability_other')}</option>
                </select>
              </div>

              {/* Scheme Scope (Central / State / Both) */}
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center">
                  <Layers className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                  {t('profile.scheme_level')}
                </label>
                <select
                  name="schemeLevelPref"
                  value={formData.schemeLevelPref}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                >
                  <option value="both">{t('profile.level_both')}</option>
                  <option value="central">{t('profile.level_central')}</option>
                  <option value="state">{t('profile.level_state')}</option>
                </select>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons for Mobile */}
          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
            {mobileStep > 1 ? (
              <button
                type="button"
                onClick={() => setMobileStep((s) => s - 1)}
                className="inline-flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('profile.btn_back')}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                {t('profile.btn_reset')}
              </button>
            )}

            {mobileStep < 3 ? (
              <button
                type="button"
                onClick={() => setMobileStep((s) => s + 1)}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 transition"
              >
                <span>{t('profile.btn_next')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-orange-800 hover:bg-orange-900 active:scale-95 shadow-xs transition"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>{t('profile.btn_save_check')}</span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP / TABLET GRID VIEW (sm:block / sm:grid)                 */}
        {/* ============================================================== */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Age */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                {t('profile.age')}
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                max="120"
                placeholder={t('profile.age_placeholder')}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700 transition"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                {t('profile.gender')}
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700 transition"
              >
                <option value="">{t('profile.gender_placeholder')}</option>
                <option value="male">{t('profile.gender_male')}</option>
                <option value="female">{t('profile.gender_female')}</option>
                <option value="transgender">{t('profile.gender_transgender')}</option>
                <option value="other">{t('profile.gender_other')}</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                {t('profile.state')}
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700 transition"
              >
                <option value="">{t('profile.select_state')}</option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Annual Income (with live Indian digit grouping) */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center justify-between">
                <span className="flex items-center">
                  <IndianRupee className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                  {t('profile.annual_income')}
                </span>
                {incomeFormatted && (
                  <span className="font-extrabold text-orange-800 dark:text-orange-300 text-xs">
                    ₹ {incomeFormatted}
                  </span>
                )}
              </label>
              <input
                type="number"
                name="annualIncome"
                value={formData.annualIncome}
                onChange={handleChange}
                min="0"
                step="5000"
                placeholder={t('profile.income_placeholder')}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700 transition"
              />
            </div>

            {/* Caste Category */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                {t('profile.caste')}
              </label>
              <select
                name="casteCategory"
                value={formData.casteCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700 transition"
              >
                <option value="">{t('profile.caste_placeholder')}</option>
                <option value="general">{t('profile.caste_general')}</option>
                <option value="obc">{t('profile.caste_obc')}</option>
                <option value="sc">{t('profile.caste_sc')}</option>
                <option value="st">{t('profile.caste_st')}</option>
                <option value="ews">{t('profile.caste_ews')}</option>
              </select>
            </div>

            {/* Occupation */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center">
                <Briefcase className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                {t('profile.occupation')}
              </label>
              <select
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700 transition"
              >
                <option value="">{t('profile.occ_placeholder')}</option>
                <option value="farmer">{t('profile.occ_farmer')}</option>
                <option value="student">{t('profile.occ_student')}</option>
                <option value="unemployed">{t('profile.occ_unemployed')}</option>
                <option value="artisan">{t('profile.occ_artisan')}</option>
                <option value="street_vendor">{t('profile.occ_street_vendor')}</option>
                <option value="salaried">{t('profile.occ_salaried')}</option>
                <option value="daily_wage">{t('profile.occ_daily_wage')}</option>
                <option value="retired">{t('profile.occ_retired')}</option>
                <option value="homemaker">{t('profile.occ_homemaker')}</option>
                <option value="entrepreneur">{t('profile.occ_entrepreneur')}</option>
              </select>
            </div>

            {/* Disability Status */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center">
                <HeartHandshake className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                {t('profile.disability')}
              </label>
              <select
                name="disability"
                value={formData.disability}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700 transition"
              >
                <option value="">{t('profile.disability_placeholder')}</option>
                <option value="none">{t('profile.disability_none')}</option>
                <option value="locomotor">{t('profile.disability_locomotor')}</option>
                <option value="visual">{t('profile.disability_visual')}</option>
                <option value="hearing">{t('profile.disability_hearing')}</option>
                <option value="other">{t('profile.disability_other')}</option>
              </select>
            </div>

            {/* Scheme Level Preference (Central / State / Both) */}
            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1.5 flex items-center">
                <Layers className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-400" />
                {t('profile.scheme_level')}
              </label>
              <select
                name="schemeLevelPref"
                value={formData.schemeLevelPref}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700 transition"
              >
                <option value="both">{t('profile.level_both')}</option>
                <option value="central">{t('profile.level_central')}</option>
                <option value="state">{t('profile.level_state')}</option>
              </select>
            </div>
          </div>

          {/* Desktop Form Buttons (WCAG AA Compliant Orange Button) */}
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('profile.btn_reset')}</span>
            </button>

            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-orange-800 hover:bg-orange-900 active:scale-95 shadow-md shadow-orange-900/20 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Saved & Matched!</span>
                </>
              ) : (
                <span>{t('profile.btn_save_check')}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
