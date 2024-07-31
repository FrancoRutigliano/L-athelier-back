import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config();

export const verifyConecction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var allowlist = [process.env.FRONTEND_URL, "http://localhost:5173"];

  const origin = req.header('origin');

  console.log(origin);

  if (allowlist.includes(origin) || !origin) {
    res.append("Access-Control-Allow-Origin", origin);
    res.append("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(200);
    }

    next();
  } else {
    res.status(401).json({ message: "prohibido" });
  }
};
