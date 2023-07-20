const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Membership extends Model {}

Membership.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
    // camelCase here but snake_case in db migration
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' },
		},
		teamId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'teams', key: 'id' },
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'membership',
	}
);

module.exports = Membership;

