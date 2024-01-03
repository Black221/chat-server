import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const JWTMiddleware = (req: Request, res: Response, next: NextFunction) => {

  const token = req.header('Authorization')
  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé : Jeton manquant' });
  }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (decoded){
        next()   
    } 
    return res.status(403).json({ message: 'Accès non autorisé : Jeton invalide' });
}