'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.Category);
            this.belongsToMany(models.Cart, {
                through: 'cart_product'
            });
        }
    }
    Product.init({
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.INTEGER.UNSIGNED,
        categoryId: DataTypes.INTEGER.UNSIGNED
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};