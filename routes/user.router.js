const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verify = require('../controllers/verified.controller')

router.post("/", userController.createUser);
router.all("/administrator", verify);
router.post("/administrator", userController.createAdministrator);
router.get("/", userController.getAllUsers);
router.get("/:username", userController.getUser);

module.exports = router;