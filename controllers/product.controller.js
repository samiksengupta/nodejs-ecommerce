const { handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
const { Product } = require("../models");

const index = async (req, res) => {
    const items = await Product.findAll().catch(error => handleServerErrorResponse(res, error));
    res.status(200).json(items);
}

const create = async (req, res) => {
    const data = await Product.create({
        slug: req.body.slug,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
    }).catch(error => handleServerErrorResponse(res, error));
    res.status(201).json(data);
    
}

const read = async (req, res) => {
    const data = await Product.findByPk(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(!data) handleNotFoundResponse(res);
    res.status(200).json(data);
}

const update = async (req, res) => {
    let data = await Product.findByPk(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(!data) handleNotFoundResponse(res);
    data.slug = req.body.slug || data.slug;
    data.name = req.body.name || data.name;
    data.description = req.body.description || data.description;
    data.price = req.body.price || data.price;
    data.categoryId = req.body.categoryId || data.categoryId;
    data = await data.save().catch(error => handleServerErrorResponse(res, error));;
    res.status(200).json(data);
}

const destroy = async (req, res) => {
    let data = await Product.findByPk(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(!data) handleNotFoundResponse(res);
    data = await data.destroy().catch(error => handleServerErrorResponse(res, error));;
    res.status(200).json(data);
}

module.exports = {
    index: index,
    create: create,
    read: read,
    update: update,
    destroy: destroy
}