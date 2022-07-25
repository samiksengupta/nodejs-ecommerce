'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {

    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.User, {
                foreignKey: 'userId'
            });

            this.belongsToMany(models.Product, {
                through: 'CartProduct',
                foreignKey: 'cartId',
                otherKey: 'productId'
            });
        }
    }
    Cart.init({
        userId: DataTypes.INTEGER.UNSIGNED,
        totalPrice: {
            type: DataTypes.VIRTUAL,
            get() {
                const total = this.Products.reduce((prev, product) => {
                    return prev + product.CartProduct.price
                }, 0);
                return total;
            },
        }
    }, {
        sequelize,
        modelName: 'Cart',
    });
    return Cart;
};