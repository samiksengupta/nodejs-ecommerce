const { handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
const { User } = require("../models");

const getCart = (req, res) => {
    User.findByPk(req.user.id).then((user) => {
        user.getCart().then(cart => {
            console.log(cart);
        }).catch(err => {
            console.log(err);
        });
    });
    res.status(200).send();
}

const setCart = (req, res) => {
    res.status(200).send();
}

const clearCart = (req, res) => {
    res.status(200).send();
}

module.exports = {
    getCart: getCart,
    setCart: setCart,
    clearCart: clearCart,
}