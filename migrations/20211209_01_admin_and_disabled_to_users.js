const { DataTypes } = require('sequelize');

// Admin user and user disabling
module.exports = {
	up: async ({ context: queryInterface }) => {
		await queryInterface.addColumn('users', 'admin', {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		});
		await queryInterface.addColumn('users', 'disabled', {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		});
	},
	down: async ({ context: queryInterface }) => {
		await queryInterface.removeColumn('users', 'admin');
		await queryInterface.removeColumn('users', 'disabled');
	},
};
