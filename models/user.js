const { Model, DataTypes, Op } = require('sequelize');

const { sequelize } = require('../util/db');

// since sequelize models are classes, we can extend them
class User extends Model {
	async number_of_notes() {
		return (await this.getNotes()).length;
	}
	static async with_notes(limit) {
		return await User.findAll({
			attributes: {
				include: [
					[sequelize.fn('COUNT', sequelize.col('notes.id')), 'note_count'],
				],
			},
			include: [
				{
					model: Note,
					attributes: [],
				},
			],
			group: ['user.id'],
			having: sequelize.literal(`COUNT(notes.id) > ${limit}`),
		});
	}
}

const classMethodsExample = async () => {
	const jami = await User.findOne({ name: 'Jami Kousa' });
	const cnt = await jami.number_of_notes();
	console.log(`Jami has ${cnt} notes`);

	// the second method returns users who have at least X notes
	const users = await User.with_notes(2);
	console.log(JSON.stringify(users, null, 2));
	users.forEach(u => console.log(u.name));
};

User.init(
	{
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
		admin: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		disabled: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		underscored: true,
		timestamps: false,
		modelName: 'user',

		// scopes can handle rows of a particular table
		defaultScope: {
			where: {
				disabled: false,
			},
		},

		// don't show disabled users and admins by default
		scopes: {
			admin: {
				where: {
					admin: true,
				},
			},
			disabled: {
				where: {
					disabled: true,
				},
			},
		},
	}
);

// scopes are used as follows
const tempScope = async () => {
	// all admins
	const adminUsers = await User.scope('admin').findAll();

	// all disabled users
	const disabledUsers = await User.scope('disabled').findAll();

	// users with the string jami in their name
	const jamiUsers = User.scope({ method: ['name', '%jami%'] }).findAll();

	// it is also possible to chain scopes
	const jamiUsers2 = User.scope('admin', {
		method: ['name', '%jami%'],
	}).findAll();
};

module.exports = User;
