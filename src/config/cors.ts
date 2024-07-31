import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config();

export const verifyConecction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var allowlist = [process.env.FRONTEND_URL || "http://localhost:5173"];

  const origin = req.header('origin');

  console.log(origin);

  if (!origin) {
    return res.status(401).json({ message: "prohibido" });
  }

  if (allowlist.includes(origin) || !origin) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", "GET, POST, PUT, DELETE");
    next();
  } else {
    res.status(401).json({ message: "prohibido" });
  }
};
