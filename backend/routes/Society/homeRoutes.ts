import express from 'express';
import { getProfile, getProposal, matchSponsorsForSociety, sendByFilter, sendBySearch } from '../../controllers/Society/homeController.js';

const router = express.Router();

router.get('/', matchSponsorsForSociety);
router.get('/search', sendBySearch);
router.get('/filter', sendByFilter);
router.get('/getprofile', getProfile);
router.get('/getProposal', getProposal);

export default router