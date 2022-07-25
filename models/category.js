'use strict';
const { Model } = require('sequelize');
const { slugify } = require('../helpers');
module.exports = (sequelize, DataTypes) => {

    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.Product);
        }
    }

    Category.init({
        slug: {
            type: DataTypes.STRING,
            unique: true
        },
        name: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Category',
    });

    Category.beforeCreate(async category => {
        category.slug = category.slug || slugify(category.name);
    })

    return Category;
};