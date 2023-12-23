import { Sequelize } from 'sequelize';
import { DEV_DB_PORT, DEV_DB_NAME, DEV_DB_HOST, DEV_DB_USER, DEV_DB_PASSWORD } from './config'; // Importe seulement API_PORT depuis config.ts

if (!DEV_DB_PORT || !DEV_DB_NAME || !DEV_DB_HOST || !DEV_DB_USER || !DEV_DB_PASSWORD) {
	throw new Error('Please define DEV_DB_HOST, DEV_DB_USER, DEV_DB_PASSWORD in .env file');
}

const sequelize = new Sequelize(
	DEV_DB_NAME,
	DEV_DB_USER,
	DEV_DB_PASSWORD,
	{
		host: DEV_DB_HOST,
		port: parseInt(DEV_DB_PORT, 10),
		dialect: 'postgres',
		timezone: '+02:00',
		define: {
			timestamps: true, // Activez les horodatages automatiques
		},

	});

export default sequelize;
