const express = require('express');
const User = require('../users/models/userModel');
const router = express.Router();
const authService = require('../auth/service/authService');

// Swagger annotations for the entire file
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication and registration
 */

// Swagger annotations for the /auth/login route
/**
 * @swagger
 *   /auth/login:
 *     post:
 *       summary: Login to obtain an authentication token
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The username of the user
 *                 password:
 *                   type: string
 *                   description: The password of the user
 *       responses:
 *         200:
 *           description: Successfully authenticated. Returns an authentication token.
 *           content:
 *             application/json:
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         401:
 *           description: Unauthorized. Invalid credentials.
 */


// Swagger annotations for the /auth/register route
/**
 * @swagger
 *   /auth/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Authentication]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The username for registration
 *                 password:
 *                   type: string
 *                   description: The password for registration
 *       responses:
 *         201:
 *           description: Successfully registered. Returns the registered user details.
 *           content:
 *             application/json:
 *               example:
 *                 username: "newUser"
 *         500:
 *           description: Internal Server Error. Registration failed.
 */

router.use(express.json());

router.post('/login', function(req, res) {
    const { username, password } = req.body;
    authService.login(username, password)
        .then(result => {
            res.status(200).json(result);
        })
        .catch(error => {
            console.error(error);
            res.status(error.status || 401).json({ error: error.message || 'Unauthorized' });
        });
});

router.post('/register', function(req, res) {
    const { username, password } = req.body;
    authService.register(username, password)
        .then(savedUser => {
            res.status(201).json({ username: savedUser.username });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error!" });
        });
});

module.exports = router;
