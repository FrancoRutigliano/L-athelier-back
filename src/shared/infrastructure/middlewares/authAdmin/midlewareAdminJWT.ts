import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sessionEntity } from '../auth/entity/sessionEntity';

export const verifySessionAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

   // Clean token and remove Bearer prefix
  const secret = process.env.SECRET_JWT;

  if (!secret) {
    return res.status(500).json({ error: 'Internal server error: Secret key not defined' });
  }
  
  try {
    const decoded= jwt.verify(token, secret) as sessionEntity;
    const role = decoded.role;

    if(!role){
        return res.status(401).json({ error: 'Unauthorized: dont have permissions ' });
    }
    next(); // Token is valid, proceed to the next middleware/route
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
