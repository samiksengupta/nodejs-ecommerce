const { handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
const { Category } = require("../models");

const index = (req, res) => {
    Category.findAll().then(items => {
        res.status(200).json(items);
        res.end();
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
    create: create,
    read: read,
    update: update,
    destroy: destroy
}