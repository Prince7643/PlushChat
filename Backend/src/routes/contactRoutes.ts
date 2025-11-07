import express from 'express';
import protect from '../middleware/authMiddleware';
import { acceptFriendRequest, getAllContacts, rejectFriendRequest, sendFriendRequest } from '../controllers/contactController';


const contactRoutes=express.Router();

contactRoutes.get('/contacts',protect,getAllContacts)
contactRoutes.post('/send',protect,sendFriendRequest)
contactRoutes.post('/accept', protect, acceptFriendRequest);
contactRoutes.post('/reject', protect, rejectFriendRequest);
export default contactRoutes;