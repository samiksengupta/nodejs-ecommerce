const express = require('express');
const categoryController = require('../controllers/category.controller');
const productController = require('../controllers/product.controller');

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({
        message: 'You have reached the API service successfully!'
    });
})

apiRouter.route('/categories')
    .get(categoryController.index)
    .post(categoryController.create);

apiRouter.route('/categories/:id')
    .get(categoryController.read)
    .put(categoryController.update)
    .delete(categoryController.destroy);

apiRouter.route('/categories/:id/products')
    .get(categoryController.indexProducts);

apiRouter.route('/products')
    .get(productController.index)
    .post(productController.create);

apiRouter.route('/products/:id')
    .get(productController.read)
    .put(productController.update)
    .delete(productController.destroy);

module.exports = apiRouter;