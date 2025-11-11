import { Server, Socket } from "socket.io";
import logger from "../utils/logger";
import { Notification } from "../models/notificationModel";
const onlineUsers = new Map<string, string>(); // userId → socketId

export const CallSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    logger.info("User connected:", socket.id);

    // 🧠 When user connects, client should emit "registerUser"
    socket.on("registerUser", (userId: string) => {
      onlineUsers.set(userId, socket.id);
      io.emit('onlineUser',[...onlineUsers.keys()])
      logger.info("User registered:", userId);
    });

    // 📞 Call events
    socket.on("callUser", async({ userToCall, offer, callerId }) => {
      const targetSocketId = onlineUsers.get(userToCall);
      logger.info("CallUser event:", { userToCall, offer, callerId });
      logger.info("Target socket:", targetSocketId);
      if (targetSocketId) {
        io.to(targetSocketId).emit("incomingCall", { from: socket.id, callerId, offer });
        io.to(socket.id).emit("callInitiated", { to: targetSocketId });
        io.to(socket.id).emit("outgoingCallStarted", { to: userToCall });
      }else{
        await Notification.create({
          sender:callerId,
          receiver:userToCall,
          message:"call you",
          type:"call",
        })
        io.to(socket.id).emit("userOffline", { userToCall });
      }
    });
    socket.on("rejectCall", ({ to }) => {
      io.to(to).emit("callRejected");
    });

    socket.on("cancelCall", ({ to }) => {
      io.to(to).emit("callCancelled");
    });

    socket.on("answerCall", ({ to, answer }) => {
      io.to(to).emit("callAnswered", { answer });
    });

    socket.on("iceCandidate", ({ to, candidate }) => {
      io.to(to).emit("iceCandidate", { candidate });
    });

    socket.on("endCall", ({ to }) => {
      io.to(to).emit("callEnded");
    });

    socket.on("disconnect", () => {
      for (const [userId, sId] of onlineUsers.entries()) {
        if (sId === socket.id) {
          onlineUsers.delete(userId);
          logger.info("User disconnected:", userId);
          break;
        }
      }
      io.emit('onlineUser', [...onlineUsers.keys()])
    });
  });
};
