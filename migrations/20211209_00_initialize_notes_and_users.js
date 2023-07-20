const { DataTypes } = require('sequelize');

module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.createTable('notes', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			content: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			important: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
			},
		});
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		});
		// queryInterface, unlike Models, needs to be in snake_case
		await queryInterface.addColumn('notes', 'userId', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' },
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.dropTable('notes');
		await queryInterface.dropTable('users');
	},
};
