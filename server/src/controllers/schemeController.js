import Scheme from '../models/Scheme.js';

export const matchSchemes = async (req, res) => {
  try {
    const {
      profile = {},
      level = 'both',
      page = 1,
      limit = 6,
      category = 'all',
      searchQuery = ''
    } = req.body;

    // Never show closed schemes (status must be active or not closed)
    const allSchemes = await Scheme.find({ status: { $ne: 'closed' } }).lean();

    const userState = (profile.state || '').trim().toLowerCase();
    const userAge = profile.age !== '' && profile.age != null ? Number(profile.age) : null;
    const userIncome = profile.annualIncome !== '' && profile.annualIncome != null ? Number(profile.annualIncome) : null;
    const userGender = (profile.gender || '').toLowerCase();
    const userCaste = (profile.casteCategory || '').toLowerCase();
    const userOcc = (profile.occupation || '').toLowerCase();
    const userDisability = (profile.disability || 'none').toLowerCase();

    const matched = allSchemes.filter((scheme) => {
      // 0. Ensure scheme is active
      if (scheme.status === 'closed') return false;

      // 1. Category filter
      if (category && category !== 'all' && scheme.category !== category) {
        return false;
      }

      // 2. Search query (trilingual matching)
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

      // 3. Level constraint (central, karnataka/state, both)
      const targetLevel = (level || profile.schemeLevelPref || 'both').toLowerCase();
      if (targetLevel === 'central') {
        if (scheme.level !== 'central') return false;
      } else if (targetLevel === 'karnataka' || targetLevel === 'state') {
        if (scheme.level !== 'karnataka') return false;
      } else {
        // 'both'
        if (scheme.level === 'karnataka') {
          // If state is explicitly chosen and not Karnataka, exclude Karnataka state schemes
          if (userState && userState !== 'karnataka' && userState !== 'all') {
            return false;
          }
        }
      }

      // 4. Age Constraints (missing / null = no restriction)
      if (userAge !== null && !isNaN(userAge)) {
        if (scheme.minAge != null && userAge < scheme.minAge) return false;
        if (scheme.maxAge != null && userAge > scheme.maxAge) return false;
      }

      // 5. Income Ceiling (missing / null = no restriction)
      if (userIncome !== null && !isNaN(userIncome)) {
        if (scheme.maxIncome != null && userIncome > scheme.maxIncome) return false;
      }

      // 6. Disability Constraint
      const requiresDisability = scheme.disability === true || scheme.disabilityRequired === true;
      if (requiresDisability) {
        if (!userDisability || userDisability === 'none') return false;
      }

      // 7. Stand-Up India Special Case: (Women OR SC/ST)
      if (scheme.slug === 'stand-up-india' || scheme.code === 'STAND_UP_INDIA') {
        const isFemale = userGender === 'female';
        const isScSt = ['sc', 'st'].includes(userCaste);
        if (!isFemale && !isScSt) return false;
        return true;
      }

      // 8. Gender Constraint (empty/null = open to all genders)
      if (scheme.genders && scheme.genders.length > 0) {
        if (userGender) {
          const allowedGenders = scheme.genders.map((g) => g.toLowerCase());
          if (!allowedGenders.includes(userGender)) return false;
        }
      }

      // 9. Caste Constraint (empty/null = open to all castes)
      if (scheme.castes && scheme.castes.length > 0) {
        if (userCaste) {
          const allowedCastes = scheme.castes.map((c) => c.toLowerCase());
          if (!allowedCastes.includes(userCaste)) return false;
        }
      }

      // 10. Occupation Constraint (empty/null = open to all occupations)
      if (scheme.occupations && scheme.occupations.length > 0) {
        if (userOcc) {
          const allowedOccs = scheme.occupations.map((o) => o.toLowerCase());
          if (!allowedOccs.includes(userOcc)) return false;
        }
      }

      return true;
    });

    const totalCount = matched.length;
    const p = Math.max(1, Number(page) || 1);
    const lim = Math.max(1, Number(limit) || 6);
    const startIndex = (p - 1) * lim;
    const paginatedSchemes = matched.slice(startIndex, startIndex + lim).map((s) => ({
      ...s,
      applyLink: s.applyLink || s.portalUrl || '',
      documents: s.documents?.length ? s.documents : (s.documentsRequired || [])
    }));

    return res.json({
      success: true,
      totalCount,
      page: p,
      limit: lim,
      totalPages: Math.ceil(totalCount / lim) || 1,
      hasMore: startIndex + paginatedSchemes.length < totalCount,
      schemes: paginatedSchemes
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message || 'Error executing scheme matching algorithm.'
    });
  }
};

export const getSchemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await Scheme.findOne({
      $or: [
        { _id: id.match(/^[0-9a-fA-F]{24}$/) ? id : null },
        { slug: id },
        { code: id }
      ]
    }).lean();

    if (!scheme || scheme.status === 'closed') {
      return res.status(404).json({ success: false, message: 'Scheme not found or closed' });
    }

    scheme.applyLink = scheme.applyLink || scheme.portalUrl || '';
    scheme.documents = scheme.documents?.length ? scheme.documents : (scheme.documentsRequired || []);

    return res.json({ success: true, scheme });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const seedSchemes = async (req, res) => {
  try {
    const { seedDatabaseIfEmpty } = await import('../config/db.js');
    await seedDatabaseIfEmpty();
    const count = await Scheme.countDocuments({ status: 'active' });
    return res.json({ success: true, count, message: 'Schemes imported successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
