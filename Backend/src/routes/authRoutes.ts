import express from 'express'
import { checkAuth, login, logout, signup, updateProfile, searchUser, SaveToken, verifyEmail, SendverifyEmail } from '../controllers/authControllers';
import protect from '../middleware/authMiddleware';
import multer from 'multer';

const authRoutes=express.Router();
const upload = multer({ dest: 'uploads/' })


authRoutes.post('/signup',signup);
authRoutes.get('/verifyemail', verifyEmail);
authRoutes.post('/sendverifyemail', SendverifyEmail);
authRoutes.post('/login',login );
authRoutes.post('/logout',logout );
authRoutes.post('/updateProfile',protect,upload.single('profilePic'),updateProfile);
authRoutes.get('/checkAuth', protect,checkAuth);
authRoutes.get('/search',protect,searchUser)
authRoutes.post('/save-fcm-token',protect,SaveToken)
export default authRoutes;