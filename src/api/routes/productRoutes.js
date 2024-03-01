const express = require('express');
const Product = require('../products/models/productModel');
const router = express.Router();
const productSevice = require('../products/service/productService')
const verifyToken = require('../middleware/authMiddleware');

router.use(express.json());

// Get product
router.get('/product', verifyToken, function (req, res){
    productSevice.getAll()
     .then(products => res.send(products))
     .catch(error => {
        res.status(500).send({error: 'Internal Server Error'});
     });
});

// Post Product
router.post('/product', verifyToken, function (req, res) {
    const { title, description, price } = req.body; // Assuming these values are coming from the request body

    productSevice.createProduct(title, description, price)
        .then(savedProduct => {
            res.status(201).send(savedProduct);
        })
        .catch(error => {
            res.status(500).send({ error: 'Internal Server Error' });
            // You may want to handle or log the error in a more detailed way
        });
});

// Get one Product
router.get('/product/:id', verifyToken, function (req, res) {
    const { id } = req.params;

    productSevice.getOne(id)
        .then(product => res.status(200).send(product))
        .catch(error => {
            console.error('Error in getOne route:', error);
            res.status(500).send({ error: 'Internal Server Error' });
        });
});

// Patch one product
router.patch('/product/:id', verifyToken, function (req, res) {
    const { id } = req.params;
    const { title, description, price } = req.body;

    productSevice.updateProduct(id, title, description, price)
        .then(updatedProduct => res.send(updatedProduct))
        .catch(error => {
            res.status(500).send({ error: 'Internal Server Error' });
        });
});


// Delete one product
router.delete('/product/:id', verifyToken, function(req, res){
    const {id} = req.params
    productSevice.deleteProduct(id)
     .then(product => res.send(product))
     .catch(error => {
        res.status(500).send({error: 'Internal Server Error'})
     })
});

module.exports = router;

