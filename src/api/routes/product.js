const express = require('express');
const Product = require('../products/models/productModel');
const router = express.Router();
const productService = require('../products/service/productService');
const verifyToken = require('../middleware/authMiddleware');

router.use(express.json());

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Operations related to products
 */

/**
 * @swagger
 *   /products:
 *     get:
 *       summary: Get all products
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       responses:
 *         200:
 *           description: Successfully retrieved products
 *           content:
 *             application/json:
 *               example:
 *                 - id: "1"
 *                   title: "Product 1"
 *                   description: "Description of Product 1"
 *                   price: 29.99
 *         500:
 *           description: Internal Server Error
 */

router.get('/', verifyToken, function (req, res) {
    productService.getAll()
        .then(products => res.status(200).send(products))
        .catch(error => {
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

/**
 * @swagger
 *   /products:
 *     post:
 *       summary: Create a new product
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - description
 *                 - price
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The title of the product
 *                 description:
 *                   type: string
 *                   description: The description of the product
 *                 price:
 *                   type: number
 *                   description: The price of the product
 *       responses:
 *         201:
 *           description: Successfully created a new product
 *           content:
 *             application/json:
 *               example:
 *                 id: "2"
 *                 title: "Product 2"
 *                 description: "Description of Product 2"
 *                 price: 39.99
 *         500:
 *           description: Internal Server Error
 */

router.post('/', verifyToken, function (req, res) {
    const { title, description, price } = req.body;

    productService.createProduct(title, description, price)
        .then(savedProduct => res.status(201).send(savedProduct))
        .catch(error => {
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

/**
 * @swagger
 *   /products/{id}:
 *     get:
 *       summary: Get a specific product by ID
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the product to retrieve
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Successfully retrieved the product
 *           content:
 *             application/json:
 *               example:
 *                 id: "1"
 *                 title: "Product 1"
 *                 description: "Description of Product 1"
 *                 price: 29.99
 *         500:
 *           description: Internal Server Error
 */

router.get('/:id', verifyToken, function (req, res) {
    const { id } = req.params;

    productService.getOne(id)
        .then(product => res.status(200).send(product))
        .catch(error => {
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

/**
 * @swagger
 *   /products/{id}:
 *     patch:
 *       summary: Update a specific product by ID
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the product to update
 *           schema:
 *             type: string
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   description: The new title of the product
 *                 description:
 *                   type: string
 *                   description: The new description of the product
 *                 price:
 *                   type: number
 *                   description: The new price of the product
 *       responses:
 *         200:
 *           description: Successfully updated the product
 *           content:
 *             application/json:
 *               example:
 *                 id: "1"
 *                 title: "Updated Product 1"
 *                 description: "Updated Description of Product 1"
 *                 price: 39.99
 *         500:
 *           description: Internal Server Error
 */

router.patch('/:id', verifyToken, function (req, res) {
    const { id } = req.params;
    const { title, description, price } = req.body;

    productService.updateProduct(id, title, description, price)
        .then(updatedProduct => res.status(200).send(updatedProduct))
        .catch(error => {
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

/**
 * @swagger
 *   /products/{id}:
 *     delete:
 *       summary: Delete a specific product by ID
 *       tags: [Products]
 *       security:
 *         - BearerAuth: []
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: The ID of the product to delete
 *           schema:
 *             type: string
 *       responses:
 *         200:
 *           description: Successfully deleted the product
 *           content:
 *             application/json:
 *               example:
 *                 id: "1"
 *                 title: "Product 1"
 *                 description: "Description of Product 1"
 *                 price: 29.99
 *         500:
 *           description: Internal Server Error
 */

router.delete('/:id', verifyToken, function(req, res) {
    const { id } = req.params;

    productService.deleteProduct(id)
        .then(deletedProduct => res.status(200).send(deletedProduct))
        .catch(error => {
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

module.exports = router;
