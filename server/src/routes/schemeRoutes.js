import express from 'express';
import { matchSchemes, getSchemeById, seedSchemes } from '../controllers/schemeController.js';

const router = express.Router();

router.post('/match', matchSchemes);
router.get('/seed', seedSchemes);
router.get('/:id', getSchemeById);

export default router;
