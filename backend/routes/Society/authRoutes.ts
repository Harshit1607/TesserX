import * as express from 'express';
import { societyLogin, societySignup } from '../../controllers/Society/authController';


const router = express.Router();

router.post('/signup', societySignup);
router.post('/login', societyLogin);


export default router;