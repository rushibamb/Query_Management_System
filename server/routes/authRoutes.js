import express from 'express';
import { checkSetup, registerAdmin, loginAdmin } from '../controllers/authController.js';

const router = express.Router();

router.get('/setup', checkSetup);
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

export default router;
