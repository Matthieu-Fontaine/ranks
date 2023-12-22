import { NextFunction, Request, Response } from 'express';

const sequelizeErrorMiddleware = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'SequelizeDatabaseError') {
    return res.status(400).json({ error: 'Erreur de base de données' });
  } else if (error.name === 'SequelizeValidationError') {
    return res.status(422).json({ error: 'Validation des données échouée' });
  }

  next(error); // Gestionnaire d'erreurs par défaut
};

export default sequelizeErrorMiddleware;
