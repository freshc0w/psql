const Note = require('./note');
const User = require('./user');
const Team = require('./team');
const Membership = require('./membership');

// one to many relationship between users and notes entries
User.hasMany(Note);
Note.belongsTo(User);

// many to many relationship between users and teams
User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

module.exports = { Note, User, Team, Membership };
