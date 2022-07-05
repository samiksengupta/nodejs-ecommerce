const { Op } = require("sequelize");
const { handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
const { Category, Product } = require("../models");

const index = (req, res) => {
    Category.findAll().then(items => {
        res.status(200).json(items);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const indexProducts = (req, res) => {
    let where = {};
    if(req.query.minprice || req.query.maxprice) {
        where[Op.and] = {
            price: {
                [Op.gte]: req.query.minprice || 0,
                [Op.lte]: req.query.maxprice || 999999,
            }
        }
    }
    if(req.query.keywords) {
        const keywords = req.query.keywords.split(/[ ,]+/);
        let like = [];    
        for(word of keywords) {
            like.push({
                [Op.like]: `%${word}%`
            });
        }
        where[Op.and] = {
            name: {
                [Op.or]: like
            }
        };
    }
    Category.findByPk(req.params.id, {
        include: {
            model: Product,
            where: where
        }
    }).then(data => {
        if(data) {
            res.status(200).json(data.Products);
            res.end();
        }
        else {
            handleNotFoundResponse(res);
        }
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const create = (req, res) => {
    Category.create({
        slug: req.body.slug,
        name: req.body.name,
    }).then(data => {
        res.status(201).json(data);
        res.end();
    }).catch(error => {
        handleServerErrorResponse(res, error);
    });
}

const read = (req, res) => {
    Category.findByPk(req.params.id).then(data => {
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
    Category.findByPk(req.params.id).then(data => {
        if(data) {
            data.slug = req.body.slug;
            data.name = req.body.name;
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
    Category.findByPk(req.params.id).then(data => {
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
    indexProducts: indexProducts,
    create: create,
    read: read,
    update: update,
    destroy: destroy
}