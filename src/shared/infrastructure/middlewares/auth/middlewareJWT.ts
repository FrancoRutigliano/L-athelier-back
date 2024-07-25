import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const verifySession = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.replace(/Bearer\s+/i, '').trim(); // Clean token and remove Bearer prefix
  const secret = process.env.SECRET_JWT;

  if (!secret) {
    return res.status(500).json({ error: 'Internal server error: Secret key not defined' });
  }
  
  try {
    jwt.verify(token, secret);
    next(); // Token is valid, proceed to the next middleware/route
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
