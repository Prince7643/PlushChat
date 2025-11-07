import express from 'express'
import { getChatPartners, getMessagesByUserId, sendMessage } from '../controllers/messageControl';
import protect from '../middleware/authMiddleware';

const messageRoute=express.Router();

messageRoute.get('/chats',protect,getChatPartners)
messageRoute.get('/:id',protect,getMessagesByUserId)

messageRoute.post('/send/:id',protect,sendMessage)

export default messageRoute;