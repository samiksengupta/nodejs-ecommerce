'use strict';
const { Model } = require('sequelize');
const { hashPassword, comparePassword } = require('../helpers');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.Cart, {
                foreignKey: 'userId'
            });
        }

        static async authenticate(username, password) {
            const user = await User.findOne({
                where: {
                    username: username
                }
            });
            if(user) {
                if(await comparePassword(password, user.password)) {
                    return user;
                }
            }
            return await false;
        }
    }
    User.init({
        name: DataTypes.STRING,
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        refreshToken: DataTypes.STRING,
        isAdmin: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'User',
    });
    User.beforeCreate(async (user, options) => {
        user.password = await hashPassword(user.password);
    });
    return User;
};