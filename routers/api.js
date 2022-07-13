const express = require('express');
const authController = require('../controllers/auth.controller');
const categoryController = require('../controllers/category.controller');
const productController = require('../controllers/product.controller');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');
const { authenticate, authorize } = require('../middlewares/auth');

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({
        message: 'You have reached the API service successfully!'
    });
});

apiRouter.route('/register').post(authController.register);
apiRouter.route('/login').post(authController.login);
apiRouter.route('/logout').post(authController.logout);
apiRouter.route('/refresh').post(authController.refresh);

apiRouter.use('/users', authenticate);
apiRouter.route('/users')
    .get(userController.index)
    .post(authorize, userController.create);

apiRouter.route('/users/:id')
    .get(userController.read)
    .put(authorize, userController.update)
    .delete(authorize, userController.destroy);

apiRouter.use('/categories', authenticate);
apiRouter.route('/categories')
    .get(categoryController.index)
    .post(authorize, categoryController.create);

apiRouter.route('/categories/:id')
    .get(categoryController.read)
    .put(authorize, categoryController.update)
    .delete(authorize, categoryController.destroy);

apiRouter.route('/categories/:id/products')
    .get(categoryController.indexProducts);

apiRouter.use('/products', authenticate);
apiRouter.route('/products')
    .get(productController.index)
    .post(authorize, productController.create);

apiRouter.route('/products/:id')
    .get(productController.read)
    .put(authorize, productController.update)
    .delete(authorize, productController.destroy);

module.exports = apiRouter;