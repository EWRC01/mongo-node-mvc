const express = require('express');
const User = require('../users/models/userModel');
const router = express.Router();
const authService = require('../auth/service/authService');

router.use(express.json());

router.post('/login', function(req, res) {
    const { username, password } = req.body;
    authService.login(username, password)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error(error);
            res.status(error.status || 500).json({ error: error.message || 'Login failed' });
        });
});

router.post('/register', function(req, res) {
    const { username, password } = req.body;
    authService.register(username, password)
        .then(savedUser => {
            res.status(201).send(savedUser);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ error: "Internal Server Error!" });
        });
});

module.exports = router;