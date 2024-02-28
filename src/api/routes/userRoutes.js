const express = require('express');
const User = require('../users/models/userModel');
const router = express.Router();
const userService = require('../users/service/userService');

router.use(express.json());

// Get User

router.get('/users', function(req, res) {
    res.send('This action returns all products!')
});

router.get('/users/:id', function(req, res){
    res.send('This action return one user!')
});

router.patch('/users/:id', function(req, res){
    res.send('This action patch one user!')
});

router.delete('/users/:id', function(req, res){
    res.send('This action delete an user')
});

module.exports = router;
