import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const verifySession = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized", details: false });
    }
 
    const authToken = token.replace(/bearer/gim, '').trim(); // Limpiar el token Bearer y obtener solo el token
    const secret = process.env.SECRET_JWT;

    if (!secret) {
        return res.status(500).json({ message: 'JWT Not found',details:false });
    }

    try {
        const decoded: any = jwt.verify(authToken, secret); 

        if (decoded) {
            const { id, name, role } = decoded; 

            req.session.user = { id, name, role };

            next(); 
        } else {
            return res.status(401).json({ error: 'Invalid token',details:false });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error al verificar el token',details:false });
    }
};

