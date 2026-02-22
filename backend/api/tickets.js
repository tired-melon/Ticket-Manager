const express = require('express');
const dbConnect = require('../database/db.js');


const ticketRouter = express.Router();

// GET tickets
ticketRouter.get('/', async (req, res) => {
    try {
        const [query] = await dbConnect.query(`
        SELECT
            tickets.id,
            tickets.title,
            users.name AS assigned_user
        FROM tickets
        LEFT JOIN users
        ON tickets.user_id = users.id
        `);
        res.json(query); 
    } catch(e) {
        console.error("[ERROR] GET /tickets error: ", e);
        res.json({ error: "Database query failed"});
    }
});

// POST tickets
ticketRouter.post('/', async (req, res) => {
    const { title, user_id } = req.body;
    if (!title) res.json({ error: "Title is required" });

    try {
        const [result] = await dbConnect.query(
            'INSERT INTO tickets (title, user_id) VALUES (?, ?)',
            [title, user_id || null]
        );
        res.json({ id: result.insertId, title });
    } catch (e) {
        console.error("[ERROR] POST /tickets error: ", e);
        res.json({ error: "Failed to create ticket"})
    }
});

// PATCH tickets
ticketRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) res.json({ error: "Title is required" });

    try {
        const[result] = await dbConnect.query(
            'UPDATE tickets SET title = ? WHERE id = ?',
            [title, id]
        );
        if (!result.affectedRows) res.json({error: "Ticket not found"});
        res.json({ id, title });
    } catch (e) {
        console.error("[ERROR] PATCH /tickets error: ", e);
        res.json({ error: "Failed to update ticket"});
    }
});

// DELETE tickets
ticketRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const [result] = await dbConnect.query(
            'DELETE FROM tickets WHERE id = ?',
            [id]
        );
    } catch (e) {
        console.error("[ERROR] DELETE /tickets error: ", e);
        res.json({ error: "Ticket not found"});
    }
});

module.exports = ticketRouter;