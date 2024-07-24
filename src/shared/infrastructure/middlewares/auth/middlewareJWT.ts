import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifySession = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];

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

        if (decoded && typeof decoded === 'object' && decoded.id && decoded.name && decoded.role) {
            const { id, name, role } = decoded; 

            req.session.user = { id, name, role };

            next(); 
        } else {
            return res.status(401).json({ error: 'Token inválido' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
