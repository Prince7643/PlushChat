import jwt from "jsonwebtoken";

export const genrateToken = (id: string,res:any) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "devlopment",
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};