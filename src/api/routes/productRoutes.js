const express = require('express');
const Product = require('../products/models/productModel');
const router = express.Router();
const productSevice = require('../products/service/productService')


// Get product
router.get('/product', function (req, res){
    productSevice.getAll()
     .then(products => res.send(products))
     .catch(error => {
        res.status(500).send({error: 'Internal Server Error'});
     });
});

// Post Product
router.post('/product', function (req, res){
    res.send("This action post a product")
});

// Get one Product
router.get('/product/:id', function (req, res){
    res.send("This action return one product")
});

// Patch one product
router.patch('/product/:id', function(req, res){
    res.send("This action patch one product")
});

// Delete one product
router.delete('/product/:id', function(req, res){
    res.send("This action delete one product")
});

module.exports = router;

