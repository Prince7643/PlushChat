import { Message } from "../models/messsageModel"
import {Server,Socket} from 'socket.io'
import { User } from "../models/userModel"
import { sendPushNotification } from "../config/firebaseAdmin"
import logger from "../utils/logger";
export const chatSocket=(io:Server)=>{
    io.on("connection",(socket:Socket)=>{
        logger.info("User connected",socket.id)

        socket.on('joinRoom',(chatId:string)=>{
            socket.join(chatId)
            logger.info("User joined room", chatId)
        })
        socket.on("typing", ({ senderId, receiverId, isTyping }) => {
        if (!senderId || !receiverId) {
            return;
        }
        // ensure receiver is in their own room - debug log
        io.to(receiverId).emit("userTyping", { senderId, isTyping });
        });

        socket.on('sendMessage',async(data)=>{
            const {senderId,receiverId,message}=data
            if( !senderId || !receiverId || !message){
                return logger.info("Invalid data")
            }
            const newMessage=new Message({
                senderId,
                receiverId,
                message
            })
            await newMessage.save()
            io.to(receiverId).emit('receiveMessage', newMessage);
            io.to(senderId).emit('receiveMessage', newMessage);
            const reciver = await User.findById(receiverId)
            if (reciver?.fcmToken) {
                await sendPushNotification(reciver.fcmToken, "New Message", message);
                }
        })
        socket.on('leaveRoom',()=>{
            logger.info("User disconnected", socket.id)
        })
    })

}
