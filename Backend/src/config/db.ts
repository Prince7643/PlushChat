import mongoose from "mongoose";
import logger from "../utils/logger";

export async function connectDB() {
    try {
        const connection= await mongoose.connect(process.env.MONGO_URI as string);
        
        if(connection){
            logger.info("Connected to MongoDB");
        }

    } catch (error) {
        logger.error(error);
    }
}