const { handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
const { Product } = require("../models");

const index = (req, res) => {
    Product.findAll().then(items => {
        res.status(200).json(items);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = (req, res) => {
    Product.create({
        slug: req.body.slug,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = (req, res) => {
    Product.findByPk(req.params.id).then(data => {
        if(data) {
            res.status(200).json(data);
            res.end();
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const update = (req, res) => {
    Product.findByPk(req.params.id).then(data => {
        if(data) {
            data.slug = req.body.slug;
            data.name = req.body.name;
            data.description = req.body.description;
            data.price = req.body.price;
            data.categoryId = req.body.categoryId;
            data.save().then(data => {
                res.status(200).json(data);
                res.end();
            }).catch(error => {
                handleServerErrorResponse(res, error);
            });
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const destroy = (req, res) => {
    Product.findByPk(req.params.id).then(data => {
        if(data) {
            data.destroy().then(data => {
                res.status(200).json(data);
                res.end();
            }).catch(error => {
                handleServerErrorResponse(res, error);
            });
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

module.exports = {
    index: index,
    create: create,
    read: read,
    update: update,
    destroy: destroy
}