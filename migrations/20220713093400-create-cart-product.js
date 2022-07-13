'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Cart_Product', {
            cartId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'carts',
                    key: 'id'
                },        
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            productId: {
                type: Sequelize.INTEGER.UNSIGNED,
                references: {
                    model: 'products',
                    key: 'id'
                },        
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            quantity: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 1
            },
            price: {
                type: Sequelize.INTEGER.UNSIGNED,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Cart_Product');
    }
};