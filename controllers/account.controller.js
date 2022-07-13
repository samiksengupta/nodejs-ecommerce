const { handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
const { User, Product } = require("../models");

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
    User.findByPk(req.user.id).then((user) => {
        console.log(user, req.body.products);
        user.createCart({ abc: 123 }).then(cart => {
            for(cartProduct of req.body.products) {
                Product.findByPk(cartProduct.id).then(product => {
                    cart.addProduct(product, { through: { quantity: cartProduct.quantity, price: product.price }});
                })
            }
            /* cart.addProducts(req.body.products.map(obj => {
                return obj.id;
            }), {

            }); */
        }).catch(err => {
            console.log(err);
        });
    });
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