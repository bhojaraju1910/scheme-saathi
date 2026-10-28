import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './context/AuthContext';
import { schemeService } from './services/api';
import Navbar from './components/Navbar';
import ProfileForm from './components/ProfileForm';
import SchemeFilterBar from './components/SchemeFilterBar';
import SchemeCard from './components/SchemeCard';
import SchemeDetailsModal from './components/SchemeDetailsModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { Sparkles, RefreshCw, AlertCircle, ChevronDown, Award } from 'lucide-react';

export default function App() {
  const { t } = useTranslation();
  const { activeProfile, apiMode } = useAuth();

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [levelPref, setLevelPref] = useState('both');

  // Scheme results state
  const [schemes, setSchemes] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  // Modals & Drawers
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(true);

  const PAGE_LIMIT = 6;

  // Sync level preference with active profile if profile changes
  useEffect(() => {
    if (activeProfile?.schemeLevelPref) {
      setLevelPref(activeProfile.schemeLevelPref);
    }
  }, [activeProfile?.schemeLevelPref]);

  // Fetch schemes (Reset to page 1)
  const fetchSchemes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await schemeService.matchSchemes({
        profile: activeProfile,
        level: levelPref,
        page: 1,
        limit: PAGE_LIMIT,
        category: selectedCategory,
        searchQuery
      });

      setSchemes(res.schemes || []);
      setTotalCount(res.totalCount || 0);
      setPage(1);
      setHasMore(res.hasMore ?? ((res.schemes?.length || 0) < (res.totalCount || 0)));
    } catch (err) {
      setError(err.message || 'Failed to match schemes.');
    } finally {
      setLoading(false);
    }
  }, [activeProfile, levelPref, selectedCategory, searchQuery, apiMode]);

  useEffect(() => {
    fetchSchemes();
  }, [fetchSchemes]);

  // Load More (Pagination without fixed cap)
  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const res = await schemeService.matchSchemes({
        profile: activeProfile,
        level: levelPref,
        page: nextPage,
        limit: PAGE_LIMIT,
        category: selectedCategory,
        searchQuery
      });

      setSchemes((prev) => [...prev, ...(res.schemes || [])]);
      setPage(nextPage);
      setTotalCount(res.totalCount || 0);
      setHasMore(res.hasMore ?? (schemes.length + (res.schemes?.length || 0) < (res.totalCount || 0)));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navigation */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onToggleProfileDrawer={() => setShowProfileDrawer(!showProfileDrawer)}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-orange-600/10 dark:from-orange-600/15 via-transparent to-transparent pt-8 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            {/* Replaced with "Free - Hindi - English - Kannada" (WCAG AA Compliant) */}
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800 mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-300" />
              <span>{t('hero.free_multilingual_badge')}</span>
            </span>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-tight">
              {t('hero.title_part1')}{' '}
              <span className="text-orange-800 dark:text-orange-400">
                {t('hero.title_part2')}
              </span>
            </h1>

            <p className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* Profile Card / Drawer */}
        {showProfileDrawer && (
          <div className="transition-all duration-300">
            <ProfileForm onProfileChanged={() => fetchSchemes()} />
          </div>
        )}

        {/* Filter and Search Bar */}
        <SchemeFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          levelPref={levelPref}
          onLevelPrefChange={(lvl) => setLevelPref(lvl)}
        />

        {/* Results Counter & Status Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 px-5 py-4 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-colors">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/80 text-orange-900 dark:text-orange-300 flex items-center justify-center font-black text-lg border border-orange-200 dark:border-orange-800">
              <Award className="w-5 h-5 text-orange-800 dark:text-orange-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {t('schemes.total_found')}:
                </span>
                <span className="text-lg font-black text-orange-800 dark:text-orange-400">
                  {totalCount}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {t('schemes.showing', { shown: schemes.length, total: totalCount })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            {/* Mode badge: HIDDEN UNLESS import.meta.env.DEV is true */}
            {import.meta.env.DEV && (
              <span
                className={`px-2.5 py-1 rounded-full font-bold border ${
                  apiMode === 'real'
                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-800'
                    : 'bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 border-purple-300 dark:border-purple-800'
                }`}
              >
                {apiMode === 'real' ? t('schemes.source_badge_real') : t('schemes.source_badge_mock')}
              </span>
            )}

            <button
              type="button"
              onClick={fetchSchemes}
              disabled={loading}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Error notification if any */}
        {error && (
          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Scheme Cards Grid */}
        {loading && schemes.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-4 animate-pulse"
              >
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-4/5"></div>
                <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded"></div>
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            ))}
          </div>
        ) : schemes.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs">
            <div className="w-14 h-14 bg-orange-100 dark:bg-orange-950 text-orange-900 dark:text-orange-300 rounded-full flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              No Eligible Schemes Found
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              {t('schemes.no_schemes_found')}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {schemes.map((scheme) => (
                <SchemeCard
                  key={scheme._id || scheme.code}
                  scheme={scheme}
                  onSelect={(s) => setSelectedScheme(s)}
                />
              ))}
            </div>

            {/* Load More Button - Uncapped Pagination (WCAG AA Compliant) */}
            <div className="pt-6 pb-2 text-center">
              {hasMore ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center space-x-2 px-7 py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs transition disabled:opacity-50"
                >
                  {loadingMore ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-orange-800 dark:text-orange-400" />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <span>{t('schemes.load_more')}</span>
                      <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    </>
                  )}
                </button>
              ) : (
                <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">
                  ✓ {t('schemes.all_loaded')} ({schemes.length} of {totalCount})
                </p>
              )}
            </div>
          </>
        )}
      </main>

      {/* Scheme Full Details Modal */}
      {selectedScheme && (
        <SchemeDetailsModal
          scheme={selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      )}

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
