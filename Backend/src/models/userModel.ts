import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    lastOnline:{
        type:Date,
        default:Date.now
    },
    fcmToken:{
        type:String,
        default:""
    }
},{timestamps:true})

export const User = mongoose.model('User',userSchema);


const PendinguserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    profilePic:{
        type:String,
        default:""
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    verificationToken:{
        type:String,
        default:""
    },
    verificationTokenExpires:{ 
        type: Date 
    },
    expiresAt:{
        type:Date,
    }
},{timestamps:true})

export const PendingUser = mongoose.model('PendingUser',PendinguserSchema);