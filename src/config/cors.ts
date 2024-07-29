import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config();

export const verifyConecction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var allowlist = [process.env.FRONTEND_URL];
  const origin = req.headers.host;

  if (!origin) {
    return res.status(401).json({ message: "prohibido" });
  }

  if (allowlist.indexOf(origin) !== -1) {
    next();
  } else {
    res.status(401).json({ message: "prohibido" });
  }
};
