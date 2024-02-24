    const { response } = require("express");
    const Product = require("../models/productModel");
    const mongoose = require('mongoose');

    function getAll() {
        return new Promise((resolve, reject) => {
            Product.find({})
                .then(products => resolve(products))
                .catch(error => reject(error));
        });
    }

    function getOne(id) {
        return new Promise((resolve, reject) => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                // If the ID is not a valid ObjectId, reject the promise
                return reject({ message: 'Invalid product ID' });
            }

            Product.findById(id)
                .then(product => {
                    if (!product) {
                        reject({ message: 'Product not found' });
                    } else {
                        resolve(product);
                    }
                })
                .catch(error => reject(error));
        });
    }

    function createProduct(title, description, price) {
        return new Promise((resolve, reject) => {
            const product = new Product({ title, description, price });
            
            product.save()
                .then(savedProduct => resolve(savedProduct))
                .catch(error => reject(error));
        });
    }

    function deleteProduct(id) {
        return new Promise((resolve, reject)=> {
            Product.findById(id)
            .then(product => {
                if(!product) {
                    reject({message: 'Product Not Found!'})
                } else {
                    const deletedProduct = Product.findByIdAndDelete(id)
                    resolve(deletedProduct);
                }
            })
            .catch(error => reject(error));
        })
    
    }

    function updateProduct(id, title, description, price) {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .then(product => {
                    if (!product) {
                        reject({ message: 'Product not found!' });
                    } else {
                        // Use the returned product from findByIdAndUpdate to get the updated product
                        Product.findByIdAndUpdate(id, { title, description, price }, { new: true })
                            .then(updatedProduct => resolve(updatedProduct))
                            .catch(error => reject(error));
                    }
                })
                .catch(error => reject(error));
        });
    }
    


    module.exports = { getAll, getOne, createProduct, deleteProduct, updateProduct };
