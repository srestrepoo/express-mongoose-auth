const express = require('express');
const router = express.Router();
const sessions = require('./session.router');
const surveys = require('./survey.router');
const users = require('./user.router');
const auth = require('../controllers/auth.controller');

router.get("/", (req,res) => res.sendStatus(200));
router.post("/auth", auth);
router.use("/session", sessions);
router.use("/survey", surveys);
router.use("/user", users);

module.exports = router;