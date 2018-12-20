const express = require('express');
const router = express.Router();
const sessions = require('./sessionsRouter');
const surveys = require('./surveysRouter');

router.get("/", (req,res) => res.sendStatus(200));
router.use("/sessions", sessions);
router.use("/surveys", surveys);

module.exports = router;