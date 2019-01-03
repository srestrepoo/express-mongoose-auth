const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post("/", userController.createUser);
router.post("/administrator", userController.createAdministrator);
router.get("/", userController.getAllUsers);
router.get("/:username", userController.getUser);

module.exports = router;