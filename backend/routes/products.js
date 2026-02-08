const express = require('express');
const router = express.Router();

// Sample product data - this would be replaced with a database in a real application
let products = [
    { id: 1, name: 'Product 1', description: 'Description for product 1', price: 100 },
    { id: 2, name: 'Product 2', description: 'Description for product 2', price: 150 }
];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Get a single product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found.');
    res.json(product);
});

// Create a new product
router.post('/', (req, res) => {
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Update an existing product
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found.');
    product.name = req.body.name;
    product.description = req.body.description;
    product.price = req.body.price;
    res.json(product);
});

// Delete a product
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found.');
    const deletedProduct = products.splice(productIndex, 1);
    res.json(deletedProduct);
});

module.exports = router;