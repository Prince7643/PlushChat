import { PendingUser, User } from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { genrateToken } from "../config/utils";
import  emailService  from "../email/emailHandler";
import { createRequest, UserBody } from "../Types/interface";
import cloudinary from "../config/cloudinary";
import  registerUserTemplate  from "../email/emailTamplate/emailTamplate";
import logger from "../utils/logger";
import getverificationLink from "../utils/gernateVerificationlink";
 
export async function signup(req:Request<{},{},UserBody>,res:Response) {
    try {
        const { username, email, password } = req.body;

        if (!username||!email||!password) {
            return res.status(400).json({ msg: "Please fill all the fields" });
        }

        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters" });
        }

        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ msg: "Invalid email" });
        }

        const [pendingUser, existingUser] = await Promise.all([
            PendingUser.findOne({ email }),User.findOne({ email })
        ]);

        const userExist = pendingUser || existingUser;

        if (userExist) {
            return res.json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const { verificationLink, verificationToken, verificationExpiresAt } = getverificationLink();
        const user = await PendingUser.create({ 
            username, 
            email, 
            password:hashedPassword,
            verificationToken,
            verificationTokenExpires:verificationExpiresAt, 
            expiresAt:Date.now()+ 1000 * 60 * 60,
        });
        if (!user) {
            return res.status(400).json({ msg: "Error creating user",user });
        }
        try {
            emailService(
                email,
                "Welcome to PlusChat",
                { username: user.username, verifyLink:verificationLink },
                registerUserTemplate
            )
        } catch (error) {
            logger.error(error)
            return res.status(500).json({ msg: "Error sending welcome email" });
        }
        res.status(201).json({user});
    } catch (error) {
        logger.error(error)
        return res.status(500).json({ msg: "Error creating user" });
    }
}

export async function login(req:Request,res:Response ) {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please fill all the fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        genrateToken(user.id, res)
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ msg: "Error logging in" });
    }
}

export async function logout(req:Request, res:Response) {
    try {
       res.cookie("token", "", {maxAge:0});
        return res.status(200).json({ msg: "Logged out" });
    } catch (error) {
        return res.status(500).json({ msg: "Error logging out" });
    }
}

export async function updateProfile(req:createRequest, res:Response) {
    try {
       const profilePic = req.file 
       if(!profilePic){
        return res.status(400).json({ msg: "Please fill all the fields" });
       }
       const userId=req.user?.id;
       const uploadResponse=await cloudinary.uploader.upload(profilePic.path)
       const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})
       return res.status(200).json({ updatedUser });
    } catch (error) {
        logger.error(error)
        return res.status(500).json({ msg: "Error getting user" });
    }
}

export async function checkAuth(req:createRequest, res:Response) {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({ msg: "Error getting user" });
    }
}

export async function searchUser(req:createRequest,res:Response) {
    try {
       const queary=req.query.q as string
       if(!queary){
        return res.status(400).json({ msg: "Please fill all the fields" });
       }
       const users=await User.find({
        _id:{$ne:req.user?.id},
        $or:[{username:{$regex:queary,$options:"i"}},
        {email:{$regex:queary,$options:"i"}}]
        }).select("-password")
        return res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ msg: "Error getting users" });
    }
}

export async function SaveToken(req:createRequest,res:Response) {
    try {
        const { token } = req.body;
        const userId = req.user?.id;
        const updatedUser = await User.findByIdAndUpdate(userId, { fcmToken: token });
        if (!updatedUser) {
            return res.status(400).json({ msg: "Error saving token" });
        }
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ msg: "Error saving token" })
    };
}


export async function verifyEmail(req:Request, res:Response) {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ msg: "Please fill all the fields" });
        }
        const Pendinguser = await PendingUser.findOne({ verificationToken: token });
        if (!Pendinguser ||!Pendinguser.expiresAt||Pendinguser.expiresAt?.getTime() < Date.now()) {
            return res.status(400).json({ msg: "Invalid or expired token" });
        }
        const user = await User.create({
            username: Pendinguser.username,
            email: Pendinguser.email,
            password: Pendinguser.password,
            isVerified: true,
        });
        if (!user) {
            return res.status(400).json({ msg: "Invalid token" });
        }
        await Pendinguser.deleteOne({ _id: Pendinguser._id });
        await user.save();
        return res.status(200).json({ msg: "Email verified",user:user });
    } catch (error) {
        return res.status(500).json({ msg: "Error verifying email" });
    }
}

export async function SendverifyEmail(req:Request,res:Response) {
    
    try {
        const {email}  = req.body;
        console.log(email)
        if (!email) {
            return res.status(400).json({ msg: "Please fill all the fields" });
        }
        const user = await PendingUser.findOne({ email:email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const { verificationLink, verificationToken, verificationExpiresAt } = getverificationLink();
        const updatedUser = await PendingUser.findByIdAndUpdate(user._id, { verificationToken, verificationTokenExpires:verificationExpiresAt });
        if (!updatedUser) {
            return res.status(400).json({ msg: "Error sending email" });
        }
        try {
            emailService(
                email,
                "Welcome to PlusChat",
                { username: user.username, verifyLink: verificationLink },
                registerUserTemplate
            )
        } catch (error) {
            logger.error(error)
            return res.status(500).json({ msg: "Error sending welcome email" });
        }
        return res.status(200).json({ msg: "Email sent" });

    } catch (error) {
        logger.error(error)
    }

}