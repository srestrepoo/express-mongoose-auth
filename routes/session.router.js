const express = require('express');
const router = express.Router();
const { sessionsController } = require('../controllers/session.controller');
const verify = require('../controllers/verified.controller');

router.all("*", verify); //auth
router.get("/", sessionsController.getAllSessions);
router.get("/:id", sessionsController.getSession); 
router.post("/", sessionsController.createSession);
router.put("/:id",sessionsController.updateSession);
router.delete("/:id",sessionsController.deleteSession);

module.exports = router;