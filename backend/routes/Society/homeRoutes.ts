import * as express from 'express';
import { getProfile, getProposal, matchSponsorsForSociety, sendByFilter, sendBySearch } from '../../controllers/Society/homeController';

const router = express.Router();

// Route for search
router.post('/search', sendBySearch);

// Route for filter
router.post('/filter', sendByFilter);

// Route for profile with a parameter (id)
router.post('/profile', getProfile); // Changed to valid 'societyId'

// Route for proposal with a parameter (companyId)
router.post('/proposal', getProposal);

// Route for matching sponsors with a parameter (societyId)
router.post('/', matchSponsorsForSociety);

export default router;
