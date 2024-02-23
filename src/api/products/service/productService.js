const Product = require("../models/productModel");

function getAll() {
    return new Promise((resolve, reject) => {
        Product.find({})
            .then(products => resolve(products))
            .catch(error => reject(error));
    });
}

module.exports = { getAll };
