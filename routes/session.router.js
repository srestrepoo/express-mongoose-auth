const express = require('express');
const router = express.Router();
const { sessionsController } = require('../controllers/session.controller');
const verify = require('../controllers/verified.controller');

router.all("*", verify);
router.get("/", sessionsController.getAllSessions);
router.get("/:id", sessionsController.getSession); 
router.post("/", sessionsController.createSession);
router.put("/:id/update",sessionsController.updateSession);
router.delete("/:id/delete",sessionsController.deleteSession);

module.exports = router;