import { SAMPLE_SCHEMES } from './schemeData';

const MOCK_USERS_KEY = 'scheme_saathi_mock_users';
const MOCK_TOKEN_KEY = 'scheme_saathi_mock_token';
const MOCK_CURRENT_USER_KEY = 'scheme_saathi_mock_current_user';

// Initialize default mock users if not present
function getStoredUsers() {
  const users = localStorage.getItem(MOCK_USERS_KEY);
  if (users) {
    try {
      return JSON.parse(users);
    } catch {
      return [];
    }
  }
  const defaultUsers = [
    {
      id: 'mock-user-1',
      name: 'Ramesh Gowda',
      email: 'ramesh@example.com',
      password: 'password123',
      profile: {
        age: 38,
        gender: 'male',
        state: 'Karnataka',
        annualIncome: 120000,
        casteCategory: 'obc',
        occupation: 'farmer',
        disability: 'none',
        schemeLevelPref: 'both'
      }
    },
    {
      id: 'mock-user-2',
      name: 'Sunita Devi',
      email: 'sunita@example.com',
      password: 'password123',
      profile: {
        age: 29,
        gender: 'female',
        state: 'Karnataka',
        annualIncome: 95000,
        casteCategory: 'sc',
        occupation: 'artisan',
        disability: 'none',
        schemeLevelPref: 'both'
      }
    }
  ];
  localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
}

export const mockAuthService = {
  async register({ name, email, password, profile = {} }) {
    await new Promise((r) => setTimeout(r, 200)); // simulated latency
    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newUser = {
      id: 'mock-user-' + Date.now(),
      name,
      email,
      password,
      profile: {
        age: profile.age || '',
        gender: profile.gender || '',
        state: profile.state || 'Karnataka',
        annualIncome: profile.annualIncome != null ? profile.annualIncome : '',
        casteCategory: profile.casteCategory || 'general',
        occupation: profile.occupation || '',
        disability: profile.disability || 'none',
        schemeLevelPref: profile.schemeLevelPref || 'both',
        ...profile
      }
    };
    users.push(newUser);
    localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));

    const token = 'mock-jwt-token-' + newUser.id;
    localStorage.setItem(MOCK_TOKEN_KEY, token);
    localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(newUser));
    return { token, user: newUser };
  },

  async login({ email, password }) {
    await new Promise((r) => setTimeout(r, 200));
    const users = getStoredUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!user) {
      throw new Error('Invalid email or password. (Hint: ramesh@example.com / password123)');
    }
    const token = 'mock-jwt-token-' + user.id;
    localStorage.setItem(MOCK_TOKEN_KEY, token);
    localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(user));
    return { token, user };
  },

  async getCurrentUser() {
    await new Promise((r) => setTimeout(r, 100));
    const token = localStorage.getItem(MOCK_TOKEN_KEY);
    if (!token) return null;
    const userStr = localStorage.getItem(MOCK_CURRENT_USER_KEY);
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  },

  async updateProfile(profileData) {
    await new Promise((r) => setTimeout(r, 150));
    const userStr = localStorage.getItem(MOCK_CURRENT_USER_KEY);
    if (!userStr) throw new Error('Not authenticated');
    const user = JSON.parse(userStr);
    user.profile = { ...user.profile, ...profileData };

    // Update in users store
    const users = getStoredUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = user;
      localStorage.setItem(MOCK_USERS_KEY, JSON.stringify(users));
    }
    localStorage.setItem(MOCK_CURRENT_USER_KEY, JSON.stringify(user));
    return user;
  },

  async logout() {
    localStorage.removeItem(MOCK_TOKEN_KEY);
    localStorage.removeItem(MOCK_CURRENT_USER_KEY);
  }
};

/**
 * Filter evaluation:
 * A missing limit in a scheme means NO restriction.
 */
export function isSchemeEligible(scheme, profile, levelPref = 'both') {
  if (!profile) return true;

  // 0. Exclude closed schemes
  if (scheme.status === 'closed') return false;

  // 1. Level Filter: 'central', 'karnataka'/'state', 'both'
  const targetLevel = (levelPref || profile.schemeLevelPref || 'both').toLowerCase();
  if (targetLevel === 'central') {
    if (scheme.level !== 'central') return false;
  } else if (targetLevel === 'karnataka' || targetLevel === 'state') {
    if (scheme.level !== 'karnataka') return false;
  } else {
    // 'both'
    if (scheme.level === 'karnataka') {
      const userState = (profile.state || '').trim().toLowerCase();
      if (userState && userState !== 'karnataka' && userState !== 'all') {
        return false;
      }
    }
  }

  // 2. Age Restrictions (missing = no restriction)
  if (profile.age !== '' && profile.age != null) {
    const age = Number(profile.age);
    if (!isNaN(age)) {
      if (scheme.minAge != null && age < scheme.minAge) return false;
      if (scheme.maxAge != null && age > scheme.maxAge) return false;
    }
  }

  // 3. Annual Income Restrictions (missing = no restriction)
  if (profile.annualIncome !== '' && profile.annualIncome != null) {
    const income = Number(profile.annualIncome);
    if (!isNaN(income)) {
      if (scheme.maxIncome != null && income > scheme.maxIncome) return false;
    }
  }

  // 4. Disability Constraint
  if (scheme.disabilityRequired === true) {
    const hasDisability = profile.disability && profile.disability !== 'none';
    if (!hasDisability) return false;
  }

  // 5. Stand-Up India Special Case: (Women OR SC/ST)
  if (scheme.code === 'STAND_UP_INDIA') {
    const isFemale = (profile.gender || '').toLowerCase() === 'female';
    const isScSt = ['sc', 'st'].includes((profile.casteCategory || '').toLowerCase());
    if (!isFemale && !isScSt) return false;
    return true;
  }

  // 6. Gender Constraint (missing or empty = open to all)
  if (scheme.genders && scheme.genders.length > 0) {
    if (profile.gender) {
      const userGender = profile.gender.toLowerCase();
      if (!scheme.genders.map((g) => g.toLowerCase()).includes(userGender)) {
        return false;
      }
    }
  }

  // 7. Caste Constraint (missing or empty = open to all)
  if (scheme.castes && scheme.castes.length > 0) {
    if (profile.casteCategory) {
      const userCaste = profile.casteCategory.toLowerCase();
      if (!scheme.castes.map((c) => c.toLowerCase()).includes(userCaste)) {
        return false;
      }
    }
  }

  // 8. Occupation Constraint (missing or empty = open to all)
  if (scheme.occupations && scheme.occupations.length > 0) {
    if (profile.occupation) {
      const userOcc = profile.occupation.toLowerCase();
      if (!scheme.occupations.map((o) => o.toLowerCase()).includes(userOcc)) {
        return false;
      }
    }
  }

  return true;
}

export const mockSchemeService = {
  async matchSchemes({
    profile = {},
    level = 'both',
    page = 1,
    limit = 6,
    category = 'all',
    searchQuery = ''
  }) {
    await new Promise((r) => setTimeout(r, 200));

    // Filter all schemes
    const filtered = SAMPLE_SCHEMES.filter((scheme) => {
      // Category filter
      if (category && category !== 'all' && scheme.category !== category) {
        return false;
      }

      // Search query (English/Hindi/Kannada search)
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName =
          (scheme.name?.en && scheme.name.en.toLowerCase().includes(q)) ||
          (scheme.name?.hi && scheme.name.hi.toLowerCase().includes(q)) ||
          (scheme.name?.kn && scheme.name.kn.toLowerCase().includes(q));
        const matchesDesc =
          (scheme.shortDescription?.en && scheme.shortDescription.en.toLowerCase().includes(q)) ||
          (scheme.shortDescription?.hi && scheme.shortDescription.hi.toLowerCase().includes(q)) ||
          (scheme.shortDescription?.kn && scheme.shortDescription.kn.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc) return false;
      }

      return isSchemeEligible(scheme, profile, level);
    });

    const totalCount = filtered.length;
    const startIndex = (page - 1) * limit;
    const paginatedSchemes = filtered.slice(startIndex, startIndex + limit);

    return {
      success: true,
      totalCount,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalCount / limit) || 1,
      hasMore: startIndex + paginatedSchemes.length < totalCount,
      schemes: paginatedSchemes
    };
  },

  async getSchemeById(codeOrId) {
    await new Promise((r) => setTimeout(r, 100));
    const scheme = SAMPLE_SCHEMES.find(
      (s) => s.code === codeOrId || s._id === codeOrId
    );
    if (!scheme) throw new Error('Scheme not found');
    return { success: true, scheme };
  }
};
