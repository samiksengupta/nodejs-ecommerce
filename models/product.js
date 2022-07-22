'use strict';
const { Model } = require('sequelize');
const { slugify } = require('../helpers');
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
                through: 'CartProduct',
                foreignKey: 'productId',
                otherKey: 'cartId'
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
        price: {
            type: DataTypes.INTEGER.UNSIGNED,
            get() {
                return parseFloat(this.getDataValue('price') / 100);
            },
            set(value) {
                this.setDataValue('price', parseInt(value) * 100);
            }
        },
        categoryId: DataTypes.INTEGER.UNSIGNED
    }, {
        sequelize,
        modelName: 'Product',
    });

    Product.beforeCreate(async product => {
        product.slug = product.slug || slugify(product.name);
    })

    return Product;
};