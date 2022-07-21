'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class CartProduct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    CartProduct.init({
        cartId: DataTypes.INTEGER.UNSIGNED,
        productId: DataTypes.INTEGER.UNSIGNED,
        quantity: DataTypes.INTEGER.UNSIGNED,
        price: DataTypes.INTEGER.UNSIGNED
    }, {
        sequelize,
        modelName: 'CartProduct',
        tableName: 'cart_product'
    });
    return CartProduct;
};