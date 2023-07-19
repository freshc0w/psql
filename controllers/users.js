const router = require('express').Router();

const { User } = require('../models');

router.get('/', async (req, res) => {
	const users = await User.findAll();
	res.json(users);
});

router.post('/', async (req, res) => {
	try {
		const user = await User.create(req.body);
		res.json(user);
	} catch (error) {
		return res.status(400).json({ error });
	}
});

router.get('/:id', async (req, res) => {
	const user = await User.findByPk(req.params.id);
	user ? res.json(user) : res.status(404).end();
});

module.exports = router;