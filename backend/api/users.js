const express = require('express');
const dbConnect = require('../database/db.js');
const userRouter = express.Router();

// GET users
userRouter.get('/', async (req, res) => {
  try {
    const [users] = await dbConnect.query(
      'SELECT id, name, email FROM users'
    );
    res.json(users);
  } catch (e) {
    console.error(e);
    res.json({ error: 'Database query failed' });
  }
});

// POST new user
userRouter.post('/', async (req, res) => {
  const { username, email } = req.body;
  if (!username) return res.json({ error: 'Username required' });

  try {
    const [newUser] = await dbConnect.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email || null]
    );
    res.status(201).json({ id: newUser.insertId, username, email });
  } catch (e) {
    console.error(e);
    res.json({ error: 'Failed to create user' });
  }
});

module.exports = userRouter;
