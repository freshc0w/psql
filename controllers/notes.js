const router = require('express').Router();

const { Note } = require('../models');
const { User } = require('../models');

const { Op } = require('sequelize');

const { tokenExtractor } = require('../util/middleware');

const noteFinder = async (req, res, next) => {
	req.note = await Note.findByPk(req.params.id);
	next();
};

router.get('/', async (req, res) => {
	let important = {
		[Op.in]: [true, false],
	};

	// only important notes
	// retrieval with the link http://localhost:3001/api/notes?important=true OR http://localhost:3001/api/notes?important=false for non-important notes
	if (req.query.important) {
		important = req.query.important === 'true';
	}

	// allows users to search for specific notes based on query string
	if (req.query.search) {
		where.content = {
			[Op.substring]: req.query.search,
		};
	}
	const notes = await Note.findAll({
		attributes: { exclude: ['userId'] },
		include: {
			model: User,
			attributes: ['name'],
		},
		where, // where condition only activates if the query string is present
	});
	res.json(notes);
});

router.post('/', async (req, res) => {
	try {
		const note = await Note.create(req.body);
		res.json(req.note);
	} catch (error) {
		return res.status(400).json({ error });
	}
});

router.get('/:id', noteFinder, async (req, res) => {
	if (req.note) {
		res.json(req.note);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', noteFinder, async (req, res) => {
	if (req.note) {
		await req.note.destroy();
	}
	res.status(204).end();
});

router.put('/:id', noteFinder, async (req, res) => {
	if (req.note) {
		req.note.important = req.body.important;
		await req.note.save();
		res.json(req.note);
	} else {
		res.status(404).end();
	}
});

router.post('/', tokenExtractor, async (req, res) => {
	try {
		// req.decodedToken.id from middleware tokenExtractor
		const user = await User.findByPk(req.decodedToken.id);
		const note = await Note.create({
			...req.body,
			userId: user.id,
			date: new Date(),
		});
		res.json(note);
	} catch (error) {
		return res.status(400).json({ error });
	}
});

module.exports = router;
