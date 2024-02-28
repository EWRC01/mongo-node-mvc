const User = require('../../users/models/userModel');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


function login(username, password) {
    let foundUser; // Declare a variable to store the user object

    return User.findOne({ username })
        .then(user => {
            if (!user) {
                throw { status: 401, message: 'Authentication failed' };
            }

            foundUser = user; // Store the user object for later use
            return bcrypt.compare(password, user.password);
        })
        .then(passwordMatch => {
            if (!passwordMatch) {
                throw { status: 401, message: 'Authentication failed' };
            }

            const token = jwt.sign({ userId: foundUser._id }, 'secret', {
                expiresIn: '1h',
            });

            return { token };
        })
        .catch(error => {
            throw error;
        });
}


module.exports = {register, login}