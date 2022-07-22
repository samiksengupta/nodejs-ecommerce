const { Op } = require("sequelize");
const { check, validationResult } = require('express-validator');
const { User, Category, Product } = require("../models");

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
}

module.exports = {
    authRegister: [
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('username').trim().escape().not().isEmpty().withMessage('Username cannot be empty').bail().custom(value => {
            return User.findOne({ where: { username: value } }).then(user => { if(user) return Promise.reject('Username is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        handleValidation
    ],
    authLogin: [
        check('username').trim().escape().not().isEmpty().withMessage('Username cannot be empty').bail(),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail(),
        handleValidation
    ],
    authRefresh: [
        check('accessToken').trim().escape().not().isEmpty().withMessage('Access token cannot be empty').bail(),
        check('refreshToken').trim().escape().not().isEmpty().withMessage('Refresh token cannot be empty').bail(),
        handleValidation
    ],
    productCreate: [
        check('categoryId').trim().escape().custom(value => {
            return Category.findByPk(value).then(category => { if(!category) return Promise.reject('Category Id must be valid'); return Promise.resolve(); } );
        }),
        check('slug').trim().escape().custom(value => {
            return Product.findOne({ where: { slug: value } }).then(product => { if(product) return Promise.reject('Slug is already taken')} );
        }),
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('description').trim().escape().not().isEmpty().withMessage('Description cannot be empty').bail(),
        check('price').trim().escape().not().isEmpty().withMessage('Price cannot be empty').bail().isNumeric().withMessage('Price must be a valid number').bail(),
        handleValidation
    ],
    productUpdate: [
        check('categoryId').trim().escape().custom(value => {
            return Category.findByPk(value).then(category => { if(!category) return Promise.reject('Category Id must be valid'); return Promise.resolve(); } );
        }),
        check('slug').trim().escape().custom((value, { req }) => {
            return Product.findOne({ where: { slug: value, id: { [Op.not]: req.params.id } } }).then(product => { if(product) return Promise.reject('Slug is already taken')} );
        }),
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('description').trim().escape().not().isEmpty().withMessage('Description cannot be empty').bail(),
        check('price').trim().escape().not().isEmpty().withMessage('Price cannot be empty').bail().isNumeric().withMessage('Price must be a valid number').bail(),
        handleValidation
    ],
}