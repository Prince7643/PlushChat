// src/middleware/rateLimiter.ts
import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 15, // 15 minutes
  limit: 100, // ⛔ Max 100 requests per window per IP
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  statusCode:429
});
