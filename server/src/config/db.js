import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Scheme from '../models/Scheme.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mongodInstance = null;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scheme-saathi';

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2500
    });
    console.log(`[Database] Connected to external MongoDB at: ${uri}`);
  } catch (err) {
    console.log('[Database] Local MongoDB not detected. Booting MongoMemoryServer fallback...');
    mongodInstance = await MongoMemoryServer.create();
    const memoryUri = mongodInstance.getUri();
    await mongoose.connect(memoryUri);
    console.log(`[Database] Connected to in-memory MongoDB at: ${memoryUri}`);
  }

  // Auto seed / import schemes
  await seedDatabaseIfEmpty();
};

export const seedDatabaseIfEmpty = async () => {
  try {
    const centralPath = path.join(__dirname, '../../data/schemes.central.json');
    const karnatakaPath = path.join(__dirname, '../../data/schemes.karnataka.json');

    let centralRaw = [];
    let karnatakaRaw = [];

    if (fs.existsSync(centralPath)) {
      centralRaw = JSON.parse(fs.readFileSync(centralPath, 'utf8'));
    }
    if (fs.existsSync(karnatakaPath)) {
      karnatakaRaw = JSON.parse(fs.readFileSync(karnatakaPath, 'utf8'));
    }

    const allSchemes = [...centralRaw, ...karnatakaRaw];

    if (allSchemes.length > 0) {
      console.log(`[Seeder] Upserting ${allSchemes.length} schemes (Central: ${centralRaw.length}, Karnataka: ${karnatakaRaw.length})...`);
      for (const s of allSchemes) {
        await Scheme.findOneAndUpdate(
          { slug: s.slug },
          {
            $set: {
              ...s,
              code: s.code || s.slug,
              applyLink: s.applyLink || s.portalUrl || '',
              portalUrl: s.portalUrl || s.applyLink || '',
              documents: s.documents || s.documentsRequired || [],
              documentsRequired: s.documentsRequired || s.documents || [],
              status: s.status || 'active'
            }
          },
          { upsert: true, new: true, runValidators: true }
        );
      }
      const count = await Scheme.countDocuments({ status: 'active' });
      console.log(`[Seeder] Total active schemes in database: ${count}`);
    }

    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create([
        {
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
      ]);
      console.log('[Seeder] Default test users created.');
    }
  } catch (seedErr) {
    console.error('[Seeder Error]:', seedErr.message);
  }
};
