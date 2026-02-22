const express = require('express');

const healthRouter = express.Router();

healthRouter.get('/', (req, res) => {
    try {
        res.json({"Status": "Healthy"});
        console.log("[DEBUG] Healthy server :)")    
    } catch (e) {
        res.json("[DEBUG] Unhealthy server :(")
        console.error(e);
    }
});

module.exports = healthRouter;