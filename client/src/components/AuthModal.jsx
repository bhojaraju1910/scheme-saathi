import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, AlertCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const { login, register, activeProfile } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      if (!formData.name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    try {
      setSubmitting(true);
      if (isRegister) {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          profile: activeProfile
        });
      } else {
        await login({
          email: formData.email,
          password: formData.password
        });
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoFill = (email, password) => {
    setIsRegister(false);
    setFormData({
      name: '',
      email,
      password,
      confirmPassword: ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tricolor accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-orange-600 via-white to-emerald-700"></div>

        <div className="p-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h3 className="text-xl font-black text-slate-950 dark:text-white">
                {isRegister ? t('auth.register_title') : t('auth.login_title')}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                {isRegister ? t('auth.register_subtitle') : t('auth.login_subtitle')}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 text-xs font-semibold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {t('auth.full_name')}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                {t('auth.email')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                {t('auth.password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                />
              </div>
            </div>

            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {t('auth.confirm_password')}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-600/30 focus:border-orange-700"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2.5 rounded-xl font-bold text-sm text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-white shadow-md transition disabled:opacity-50"
            >
              {submitting
                ? 'Processing...'
                : isRegister
                ? t('auth.btn_register')
                : t('auth.btn_login')}
            </button>
          </form>

          {/* Quick Demo Logins */}
          {!isRegister && (
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 text-center">
              <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-2">
                Quick test accounts:
              </p>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDemoFill('ramesh@example.com', 'password123')}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-700"
                >
                  Ramesh (Farmer)
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('sunita@example.com', 'password123')}
                  className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-700"
                >
                  Sunita (Woman SC)
                </button>
              </div>
            </div>
          )}

          {/* Switch tab */}
          <div className="mt-5 text-center text-xs text-slate-600 dark:text-slate-400">
            {isRegister ? t('auth.already_account') : t('auth.dont_have_account')}{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              className="font-black text-orange-800 dark:text-orange-400 hover:underline ml-1"
            >
              {isRegister ? t('auth.btn_login') : t('auth.register_title')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
