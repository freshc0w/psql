const Note = require('./note');
const User = require('./user');
const Team = require('./team');
const Membership = require('./membership');
const UserNotes = require('./userNotes');

// one to many relationship between users and notes entries
User.hasMany(Note);
Note.belongsTo(User);

// many to many relationship between users and teams
User.belongsToMany(Team, { through: Membership });
Team.belongsToMany(User, { through: Membership });

// many to many relationship between users and notes
User.belongsToMany(Note, { through: UserNotes, as: 'marked_notes' });
Note.belongsToMany(User, { through: UserNotes, as: 'users_marked' });

module.exports = { Note, User, Team, Membership };
