import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifySession = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

<<<<<<< HEAD
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
=======
    if (!token) {
        return res.status(401).json({ message: "Unauthorized", details: false });
    }
 
    const authToken = token.replace(/bearer/gim, '').trim(); // Limpiar el token Bearer y obtener solo el tokenj
    const secret = process.env.SECRET_JWT;

    if (!secret) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }

    try {
        const decoded: any = jwt.verify(authToken, secret); 

        if (decoded && typeof decoded === 'object' && decoded.id && decoded.email && decoded.role) {
            const { id, email, role } = decoded; 

            //req.session.user = { id, email, role };

            next(); 
        } else {
            return res.status(401).json({ error: 'Token inválido' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
>>>>>>> 54869ecb06739731df7562564135c4c6761d92e9
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying token', details: false });
  }
};
