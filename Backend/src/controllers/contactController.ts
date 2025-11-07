import { Response } from "express"
import { createRequest } from "../Types/interface"
import { Contact } from "../models/contactModel"
import { Notification } from "../models/notificationModel"
import mongoose from "mongoose";
import {User} from '../models/userModel'
import logger from "../utils/logger";

export const getAllContacts = async (req:createRequest, res:Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(400).json({ msg: "Something wrong please login again" });

    const contacts = await Contact.find({
      $or: [
        { contactId: new mongoose.Types.ObjectId(userId) },
        { userId: new mongoose.Types.ObjectId(userId) },
      ],
      status: "Pending",
    });

    const contact = await Contact.find({
      $or: [
        { contactId: new mongoose.Types.ObjectId(userId) },
        { userId: new mongoose.Types.ObjectId(userId) },
      ],
      status: "Accepted",
    });

    const friendsId = contact.map(c =>
      c.userId.toString() === userId ? c.contactId : c.userId
    );

    const friends = await User.find({ _id: { $in: friendsId } }).select("-password");

    return res.status(200).json( {friends,contacts });
  } catch (error) {
    logger.error("Error in getAllContacts:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


export const sendFriendRequest=async(req:createRequest,res:Response)=>{
     try {
        const {contactId}=req.body
        const userId=req.user?.id
        if (!contactId || !userId) {
            return res.status(400).json({msg:"Contact not found"})
        } 
        if (contactId==userId) {
            return res.status(400).json({msg:"You can't add yourself as a contact"})
        }
        const Existingcontact=await Contact.findOne({contactId,userId})

        if (Existingcontact) {
            return res.status(400).json({msg:"Contact already exists"})
        }
        const ExistingNotification=await Notification.findOne({
            sender:userId,
            receiver:contactId
        })
        if (ExistingNotification) {
            return res.status(400).json({msg:"Notification already exists"})
        }
        const newNotification = new Notification({
            sender:userId,
            receiver:contactId,
            message:'Send you a friend request',
            type:'friendRequest',
        })
        await newNotification.save()
        await newNotification.populate("sender", "username profilePic");
        const newContact = new Contact({
            userId,
            contactId,
            status: "Pending",
        });
        await newContact.save()
        return res.status(200).json({msg:"Contact added successfully",newContact,newNotification})
    } catch (error) {
        logger.error(error)
        return res.status(500).json({msg:"Internal server error"})
    }
}

export async function acceptFriendRequest(req:createRequest, res:Response) {
    try {
        const {contactId,userId}=req.body
        if (!contactId) {
            return res.status(400).json({ msg: "Request ID is required" });
        }
        const update=await Contact.findByIdAndUpdate(
            contactId,
            {status:"Accepted"},
            {new:true}
        )
        if(!update){
            return res.status(400).json({ msg: "Error updating friend request" });
        }
        const newNotification = new Notification({
            sender:req.user?.id,
            receiver:userId,
            message:'Accepted your friend request',
            type:'friendRequest'
        });
        await newNotification.save();
        if(!newNotification){
            return res.status(400).json({ msg: "Error creating notification" });
        }

        return res.status(200).json({ update ,newNotification });
    } catch (error) {
        logger.error(error)  
        return res.status(500).json({ msg: "Error accepting friend request" });

    }
}

export async function rejectFriendRequest(req:createRequest,res:Response) {
    
    try {

        const {requestId}=req.body
        const update=Contact.findByIdAndUpdate({
            requestId,
            status:"Rejected",
            new:true
        })
        if(!update){
            return res.status(400).json({ msg: "Error rejecting friend request" });
        }
        return res.status(200).json({ update });

    } catch (error) {
        logger.error(error)
        return res.status(500).json({ msg: "Error rejecting friend request" });

    }

}
