import { createRequest } from "../Types/interface";
import { Response } from "express";
import { Notification } from "../models/notificationModel";
import logger from "../utils/logger";
export const getNotification =async (req:createRequest,res:Response)=>{
    try {
        const userId=req.user?.id

        if (!userId) {
            return res.status(400).json({ error: "User ID not provided" });
        }
        const notifications=await Notification.find({receiver:userId}).populate("sender","username profilePic")

        return res.status(200).json(notifications)

    } catch (error) {
        logger.error(error)
        return res.status(500).json({error:"Internal server error"});
    }
}

export const getUnseenMessages =async (req:createRequest, res:Response)=>{
    try {
        const userId=req.user?.id

        if (!userId) {
            return res.status(400).json({ error: "User ID not provided" });
        }
        const notifications=await Notification.find({receiver:userId,seen:false})

        return res.status(200).json(notifications)

    } catch (error) {
        logger.error(error)
        return res.status(500).json({error:"Internal server error"});
    }
}

export const markAsSeen =async (req:createRequest, res:Response)=>{
    try {
        const userId=req.user?.id
        const {type}=req.body
        console.log(type)
        if (!userId) {
            return res.status(400).json({ error: "User ID not provided" });
        }
        const notifications=await Notification.updateMany({
            receiver:userId,
            type:type
        }, {seen:true})

        return res.status(200).json(notifications)

    } catch (error) {
        logger.error(error)
        return res.status(500).json({error:"Internal server error"});
    }
}