import { User } from "../models/userModel"
import { Message } from "../models/messsageModel"
import { createRequest } from "../Types/interface"
import {  Response } from "express"
import logger from "../utils/logger";
{/**5231d46 */}
export const sendMessage=async(req:createRequest,res:Response)=>{
    try {
        const {text}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user?.id;
        if(!text || !receiverId){
            return res.status(400).json({message:"All fields are required"})
        }
        if(senderId==receiverId){
            return res.status(400).json({message:"You can't send message to yourself"})
        }
        const neqMessage=new Message({
            senderId,
            receiverId,
            message:text
        })
        await neqMessage.save()

        res.status(201).json(neqMessage)

    } catch (error) {
        logger.error('Error in sendMessage controller', error)
        return res.status(500).json({message:"Internal server error"})
    }
}

export const getChatPartners=async(req:createRequest,res:Response)=>{
    try {
        const loggedInUserId=req.user?.id;
        const message=await Message.find({
            $or:[
                {senderId:loggedInUserId},
                {receiverId:loggedInUserId}
            ]
        })
        const chatPartnerIds=[...new Set(message.map((msg)=>msg.senderId.toString()===loggedInUserId?msg.receiverId.toString():msg.senderId.toString()))
        ]
        const chatPartnerDetails=await User.find({_id:{$in:chatPartnerIds}}).select('-password')
        res.status(200).json(chatPartnerDetails)
    } catch (error) {
        logger.error('Error in getChatPartners controller', error)
        return res.status(500).json({message:"Internal server error"});
    }
}

export const getMessagesByUserId=async(req:createRequest,res:Response)=>{

    try {
        const myId=req.user?.id;
        const {id:usertoChatid}=req.params;
        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:usertoChatid},
                {senderId:usertoChatid,receiverId:myId}
            ]
        });
        res.status(200).json(messages)
    } catch (error) {
        logger.error('Error in getMessage controller',error)
        return res.status(500).json({message:"Internal server error"})
    }
}