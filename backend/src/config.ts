// Importe dotenv et charge les variables d'environnement du fichier .env
import dotenv from 'dotenv';
dotenv.config();

// config.ts
export const API_PORT = process.env.API_PORT || 0;
export const DEV_DB_PORT = process.env.DEV_DB_PORT || 0;
export const DEV_DB_NAME = process.env.DEV_DB_NAME || 0;
export const DEV_DB_HOST = process.env.DEV_DB_HOST || '';
export const DEV_DB_USER = process.env.DEV_DB_USER || '';
export const DEV_DB_PASSWORD = process.env.DEV_DB_PASSWORD || '';
