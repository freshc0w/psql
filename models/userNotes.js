const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class UserNotes extends Model {}

UserNotes.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'user', key: 'id' },
		},
		noteId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'note', key: 'id' },
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'user_notes',
	}
);

module.exports = UserNotes;
