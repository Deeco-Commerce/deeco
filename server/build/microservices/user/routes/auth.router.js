import express from 'express';
import registerUser from '../controllers/auth.register.controller.js';
import loginUser from '../controllers/auth.logIn.controller.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';
import getUserData from '../controllers/getUserData.controller.js';
// express router init
const router = express.Router();
// routes
router.route('/register').post(registerUser);
router.route('/log-in').post(loginUser);
router.route('/get-user-data').get(authMiddleware, getUserData);
// router.route('/log-in').post(authMiddleware, loginUser);
export default router;
