import { Model, DataTypes } from 'sequelize';
import sequelize from '../sequelize';

class Pokemon extends Model {
	public id!: number;
	public name!: string;
	public url!: string;
	public createdAt!: Date;
	public updatedAt!: Date;
}

Pokemon.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	url: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		allowNull: false,
		validate: {
			isDate: true
		}
	},
	updatedAt: {
		type: DataTypes.DATE,
		defaultValue: DataTypes.NOW,
		allowNull: false,
		validate: {
			isDate: true
		}
	}
}, {
	sequelize,
	modelName: 'pokemon',
	tableName: 'pokemon',
	schema: 'development',
});

export default Pokemon;
