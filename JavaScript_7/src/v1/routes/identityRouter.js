const express = require('express');
const router = express.Router();
const identityController = require('../controllers/identity.controller');

router.get('/list', identityController.getUserList);

router.post('/register', identityController.register);

router.post('/login', identityController.login);

router.delete('/logout/:userId', identityController.logout);

module.exports = router;