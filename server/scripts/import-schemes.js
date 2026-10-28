import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Scheme from '../src/models/Scheme.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runImport() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/scheme-saathi';

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log(`[Import] Connected to MongoDB at: ${uri}`);
  } catch (err) {
    console.log('[Import] Local MongoDB not detected. Starting MongoMemoryServer for import...');
    const memoryServer = await MongoMemoryServer.create();
    await mongoose.connect(memoryServer.getUri());
    console.log(`[Import] Connected to in-memory MongoDB at: ${memoryServer.getUri()}`);
  }

  const centralPath = path.join(__dirname, '../data/schemes.central.json');
  const karnatakaPath = path.join(__dirname, '../data/schemes.karnataka.json');

  const centralRaw = JSON.parse(fs.readFileSync(centralPath, 'utf8'));
  const karnatakaRaw = JSON.parse(fs.readFileSync(karnatakaPath, 'utf8'));

  const allSchemes = [...centralRaw, ...karnatakaRaw];
  console.log(`[Import] Found ${centralRaw.length} Central + ${karnatakaRaw.length} Karnataka = ${allSchemes.length} total schemes.`);

  let upsertedCount = 0;
  let errorCount = 0;

  for (const s of allSchemes) {
    if (!s.slug) {
      console.warn(`[Skip] Missing slug for scheme:`, s.name?.en);
      continue;
    }

    try {
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
      upsertedCount++;
    } catch (upsertErr) {
      console.error(`[Error] Failed to upsert "${s.slug}":`, upsertErr.message);
      errorCount++;
    }
  }

  const totalInDb = await Scheme.countDocuments({ status: 'active' });
  console.log(`[Import Finished] Successfully upserted ${upsertedCount} schemes. Errors: ${errorCount}. Total active in DB: ${totalInDb}`);

  await mongoose.disconnect();
  process.exit(0);
}

runImport().catch((err) => {
  console.error('[Fatal Import Error]:', err);
  process.exit(1);
});
