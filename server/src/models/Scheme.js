import mongoose from 'mongoose';

const localizedStringSchema = {
  en: { type: String, required: true },
  hi: { type: String, default: '' },
  kn: { type: String, default: '' }
};

const documentSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    hi: { type: String, default: '' },
    kn: { type: String, default: '' }
  },
  { _id: false }
);

const schemeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true
    },
    code: {
      type: String,
      trim: true
    },
    level: {
      type: String,
      enum: ['central', 'karnataka'],
      required: true,
      index: true
    },
    category: {
      type: String,
      default: 'general'
    },
    name: localizedStringSchema,
    shortDescription: localizedStringSchema,
    benefits: localizedStringSchema,
    documents: [documentSchema],
    documentsRequired: [documentSchema],

    // Structured Eligibility Limits (missing / null = no restriction)
    minAge: { type: Number, default: null },
    maxAge: { type: Number, default: null },
    maxIncome: { type: Number, default: null },
    genders: { type: [String], default: [] },
    castes: { type: [String], default: [] },
    occupations: { type: [String], default: [] },
    disability: { type: Boolean, default: false },
    disabilityRequired: { type: Boolean, default: false },

    applyLink: { type: String, default: '' },
    portalUrl: { type: String, default: '' },
    sourceUrl: { type: String, default: '' },
    lastVerified: { type: String, default: '2026-10-24' },
    status: {
      type: String,
      enum: ['active', 'closed'],
      default: 'active',
      index: true
    },
    needsReview: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Scheme', schemeSchema);
