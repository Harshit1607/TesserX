import * as express from 'express';
import { companyLogin, companySignup } from '../../controllers/Company/authController';


const router = express.Router();

router.post('/signup', companySignup);
router.post('/login', companyLogin);


export default router;