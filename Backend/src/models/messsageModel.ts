import mongoose from "mongoose";

const mongooseSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true,
        trim:true
    },
    seen:{
        type:Boolean,
        default:false
    },
    delivered:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

export const Message=mongoose.model("Message",mongooseSchema);