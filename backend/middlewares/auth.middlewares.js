import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(411).json({});
  }

  const token = auth.split(" ")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(403).json({});
  }
};
