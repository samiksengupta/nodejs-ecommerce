const express = require('express');
const categoryController = require('../controllers/category.controller');

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

module.exports = apiRouter;