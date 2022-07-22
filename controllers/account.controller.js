const { handleServerErrorResponse, handleNotFoundResponse } = require("../helpers");
const { User, Product, Cart } = require("../models");

const getCart = async (req, res) => {
    const user = await User.findByPk(req.user.id, {
        include: {
            model: Cart,
            include: Product
        }
    });
    if(user.Cart) res.status(200).json(user.Cart);
    else {
        await user.createCart();
        res.status(201).json(await user.getCart({
            include: Product
        }).catch(error => handleServerErrorResponse(res, error)));
    }
}

const setCart = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    let cart = await user.getCart({
        include: Product
    }).catch(error => handleServerErrorResponse(res, error));
    
    if(!cart) cart = await user.createCart();
    
    for(let reqProduct of req.body.products) {
        let product = await Product.findByPk(reqProduct.id).catch(error => handleNotFoundResponse(res));
        await cart.addProduct(product, { through: { quantity: reqProduct.quantity, price: product.price }}).catch(error => handleServerErrorResponse(res, error));
    }

    if(cart) res.status(201).json(await user.getCart({
        include: Product
    }).catch(error => handleServerErrorResponse(res, error)));
    else handleNotFoundResponse(res);
}

const clearCart = async (req, res) => {
    const user = await User.findByPk(req.user.id);
    let cart = await user.getCart().catch(error => handleServerErrorResponse(res, error));
    if(cart) {
        await cart.setProducts([]);
        res.status(200).json(await user.getCart({
            include: Product
        }).catch(error => handleServerErrorResponse(res, error)));
    }
    else handleNotFoundResponse(res);
}

module.exports = {
    getCart: getCart,
    setCart: setCart,
    clearCart: clearCart,
}