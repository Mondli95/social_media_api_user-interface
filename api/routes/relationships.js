import express from 'express';
import { getRelationships } from '../controllers/relationship.js';
import { addRelationship } from '../controllers/relationship.js';
import { removeRelationship } from '../controllers/relationship.js';

const router = express.Router();

router.get('/', getRelationships);
router.post('/', addRelationship);
router.delete('/', removeRelationship);

export default router;