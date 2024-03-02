// Sets up the routes.
const express = require('express');
const router = express.Router();

/**
  * @swagger
  * /hello:
  *   get:
  *     summary: Retrieve a Hello
  *     description: Hello World!
 */
    router.get('/', function(req, res) {
      res.send('Hello World!');
    });

    module.exports = router;