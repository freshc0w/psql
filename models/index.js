const Note = require('./note');
const User = require('./user');

// one to many relationship between users and notes entries
User.hasMany(Note);
Note.belongsTo(User);

module.exports = { Note, User };
