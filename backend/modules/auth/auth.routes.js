import { Router } from 'express';
import authController from './auth.controller.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);
router.get('/me', authController.getMe);

export default router;
