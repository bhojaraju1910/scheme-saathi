import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, getApiMode, setApiMode } from '../services/api';

const AuthContext = createContext();

const DEFAULT_GUEST_PROFILE = {
  age: '',
  gender: '',
  state: '',
  annualIncome: '',
  casteCategory: '',
  occupation: '',
  disability: '',
  schemeLevelPref: 'both'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiMode, setMode] = useState(getApiMode());

  // Guest profile state starts empty
  const [guestProfile, setGuestProfile] = useState(() => {
    const saved = localStorage.getItem('scheme_saathi_guest_profile_v2');
    return saved ? JSON.parse(saved) : DEFAULT_GUEST_PROFILE;
  });

  const checkAuth = async () => {
    try {
      setLoading(true);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.warn('Auth check error:', err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const handleModeChange = () => {
      setMode(getApiMode());
      checkAuth();
    };
    window.addEventListener('api-mode-changed', handleModeChange);
    return () => window.removeEventListener('api-mode-changed', handleModeChange);
  }, []);

  const switchApiMode = (newMode) => {
    setApiMode(newMode);
    setMode(newMode);
    checkAuth();
  };

  const login = async (credentials) => {
    const res = await authService.login(credentials);
    setUser(res.user);
    return res;
  };

  const register = async (data) => {
    const res = await authService.register(data);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    if (user) {
      const updatedUser = await authService.updateProfile(profileData);
      setUser(updatedUser);
      return updatedUser.profile;
    } else {
      const updated = { ...guestProfile, ...profileData };
      setGuestProfile(updated);
      localStorage.setItem('scheme_saathi_guest_profile_v2', JSON.stringify(updated));
      return updated;
    }
  };

  const setDemoProfile = (type) => {
    let demo = {};
    if (type === 'farmer') {
      demo = {
        age: 42,
        gender: 'male',
        state: 'Karnataka',
        annualIncome: 120000,
        casteCategory: 'obc',
        occupation: 'farmer',
        disability: 'none',
        schemeLevelPref: 'both'
      };
    } else if (type === 'student') {
      demo = {
        age: 20,
        gender: 'male',
        state: 'Karnataka',
        annualIncome: 180000,
        casteCategory: 'sc',
        occupation: 'student',
        disability: 'none',
        schemeLevelPref: 'both'
      };
    } else if (type === 'woman') {
      demo = {
        age: 34,
        gender: 'female',
        state: 'Karnataka',
        annualIncome: 140000,
        casteCategory: 'general',
        occupation: 'artisan',
        disability: 'none',
        schemeLevelPref: 'both'
      };
    } else if (type === 'disability') {
      demo = {
        age: 28,
        gender: 'female',
        state: 'Karnataka',
        annualIncome: 80000,
        casteCategory: 'general',
        occupation: 'unemployed',
        disability: 'locomotor',
        schemeLevelPref: 'both'
      };
    }
    updateProfile(demo);
  };

  const activeProfile = user?.profile || guestProfile;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        apiMode,
        switchApiMode,
        login,
        register,
        logout,
        activeProfile,
        updateProfile,
        setDemoProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
