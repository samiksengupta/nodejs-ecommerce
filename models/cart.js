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
            this.belongsTo(models.User);
            this.belongsToMany(models.Product, {
                through: 'cart-product'
            });
        }
    }
    Cart.init({
        userId: DataTypes.INTEGER.UNSIGNED
    }, {
        sequelize,
        modelName: 'Cart',
    });
    Cart.beforeCreate(async (user, options) => {
        user.password = await hashPassword(user.password);
    });
    return Cart;
};