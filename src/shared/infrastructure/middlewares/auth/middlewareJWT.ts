import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifySession = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized", details: false });
  }

  const authToken = token.replace(/^Bearer /i, '').trim(); 
  const secret = process.env.SECRET_JWT;

  if (!secret) {
    return res.status(500).json({ message: 'JWT Secret not found', details: false });
  }

  try {
    const decoded: any = jwt.verify(authToken, secret);
    
    if (decoded) {
      const { id, name, role } = decoded;

      // Inicializa req.session si no está inicializado
      if (!req.session) {
        req.session = {} as any;
      }

     
      req.session.user = { id, name, role };

      next(); 
    } else {
      return res.status(401).json({ error: 'Invalid token', details: false });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying token', details: false });
  }
};
