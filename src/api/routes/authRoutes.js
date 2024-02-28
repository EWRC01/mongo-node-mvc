const express = require('express');
const User = require('../users/models/userModel');
const router = express.Router();
const authService = require('../auth/service/authService');

router.use(express.json());

router.post('/login', function(req, res){
    const {username, password} = req.body
    authService.login(username, password)
        .then(savedUser => {
            res.status(201).send(savedUser);
        })
        .catch(error => {
            res.status(500).send({error: "Internal Server Error!"})
        })

    res.send('This route login a user');

})

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