import express from 'express'
import { getNotification, getUnseenMessages, markAsSeen } from '../controllers/notificationController'
import protect from '../middleware/authMiddleware'

const notificationRoute=express.Router()

notificationRoute.get('/get',protect,getNotification)
notificationRoute.get('/getUnseen', protect, getUnseenMessages)
notificationRoute.post('/markAsSeen', protect, markAsSeen)

export default notificationRoute