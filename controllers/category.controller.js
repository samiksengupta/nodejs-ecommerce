const { Op } = require("sequelize");
const { handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
const { Category, Product } = require("../models");

const index = async (req, res) => {
    const items = await Category.findAll().catch(error => handleServerErrorResponse(res, error));
    res.status(200).json(items);
}

const indexProducts = async (req, res) => {
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
    
    const items = await Category.findByPk(req.params.id, {
        include: {
            model: Product,
            where: where
        }
    }).catch(error => handleServerErrorResponse(res, error));
    res.status(200).json(items);
}

const create = async (req, res) => {
    const data = await Category.create({
        slug: req.body.slug,
        name: req.body.name,
    }).catch(error => handleServerErrorResponse(res, error));
    res.status(201).json(data);
}

const read = async (req, res) => {
    const data = await Category.findByPk(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(!data) handleNotFoundResponse(res);
    res.status(200).json(data);
}

const update = async (req, res) => {
    let data = await Category.findByPk(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(!data) handleNotFoundResponse(res);
    data.slug = req.body.slug || data.slug;
    data.name = req.body.name || data.name;
    data = await data.save().catch(error => handleServerErrorResponse(res, error));;
    res.status(200).json(data);
}

const destroy = async (req, res) => {
    let data = await Category.findByPk(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(!data) handleNotFoundResponse(res);
    data = await data.destroy().catch(error => handleServerErrorResponse(res, error));;
    res.status(200).json(data);
}

module.exports = {
    index: index,
    indexProducts: indexProducts,
    create: create,
    read: read,
    update: update,
    destroy: destroy
}