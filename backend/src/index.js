const express = require("express");
const cors = require('cors');

const userRouter = require('../api/users.js');
const ticketRouter = require('../api/tickets.js');
const healthRouter = require('../api/health.js');
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/health', healthRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => console.log("[INIT] Server Running on port ", PORT));