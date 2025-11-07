import  express  from "express";
import { Request,Response } from "express";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/db";
import dotenv from 'dotenv';
import { Server } from "socket.io";
import messageRoute from "./routes/messagesRoutes";
import cookieParser from 'cookie-parser'
import { limiter } from "./config/rateLimiter";
import cors from 'cors';
import { chatSocket } from "./sockets/ChatSocket";
import http from 'http';
import contactRoutes from "./routes/contactRoutes";
import notificationRoute from "./routes/notification";
import logger from "./utils/logger";
import { CallSocket } from "./sockets/CallSocket";

dotenv.config();

const app =express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ limit: "500kb", extended: true }));
app.use(limiter); // from express-rate-limit

app.use(cors(
    {
        origin:process.env.FRONTENDURL|| 'http://localhost:5173',
        credentials: true,
    }
))

//Connecting data base
connectDB();

//root endpoint
app.get('/',(req:Request,res:Response)=>{
    res.send('Hello World');
});

//Routes
app.use('/api/user',authRoutes);
app.use('/api/message',messageRoute);
app.use('/api/contact',contactRoutes)
app.use('/api/notification',notificationRoute)

//Creating socket servers
const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:process.env.FRONTENDURL||'http://localhost:5173',
        credentials:true,
        methods: ["GET", "POST"]
    }
})
chatSocket(io)
CallSocket(io)

//Start server
const port =process.env.PORT || 3000;
server.listen(port,()=>{
    logger.info(`Server is running on port ${port} in ${process.env.NODE_ENV} mode`);
});


