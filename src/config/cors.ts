import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv"
dotenv.config();

export const verifyConecction = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  var allowlist = [process.env.FRONTEND_URL];
  //const origin = req.headers.host;

  const orrigin = req.header('origin');

  console.log(orrigin);

  if (!origin) {
    return res.status(401).json({ message: "prohibido" });
  }

  if (allowlist.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
    next();
  } else {
    res.status(401).json({ message: "prohibido" });
  }
};
