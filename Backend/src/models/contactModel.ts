import mongoose from "mongoose";

const contactSchema=new mongoose.Schema({
    contactId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["Pending","Accepted","Rejected","Blocked","Send"],
        default:"Send"
    }
},{timestamps:true})


export const Contact=mongoose.model("Contact",contactSchema);