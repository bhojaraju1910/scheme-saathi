import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Scheme from '../models/Scheme.js';
import User from '../models/User.js';
import { SAMPLE_SCHEMES } from '../data/sampleSchemes.js';

async function runSeed() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scheme-saathi';

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log(`Connected to MongoDB at ${uri}`);
  } catch {
    console.log('Local MongoDB not available. Starting MongoMemoryServer for seed verification...');
    const memoryServer = await MongoMemoryServer.create();
    await mongoose.connect(memoryServer.getUri());
  }

  console.log('Clearing existing schemes...');
  await Scheme.deleteMany({});

  console.log(`Inserting ${SAMPLE_SCHEMES.length} trilingual schemes...`);
  const result = await Scheme.insertMany(SAMPLE_SCHEMES);
  console.log(`Successfully seeded ${result.length} schemes!`);

  console.log('Checking test users...');
  const userCount = await User.countDocuments();
  if (userCount === 0) {
    await User.create({
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
    });
    console.log('Created test user: ramesh@example.com / password123');
  }

  console.log('Seed completed successfully.');
  await mongoose.disconnect();
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
