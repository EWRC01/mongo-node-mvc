const User = require('../../users/models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function register(username, password) {
    return bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            const user = new User({ username, password: hashedPassword });
            return user.save();
        })
        .then(savedUser => savedUser)
        .catch(error => {
            throw error;
        });
}

module.exports = {register}