'use strict';

const { hashPassword } = require("../helpers");

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Products', [
            {
                slug: 't-shirt',
                name: 'T-Shirt',
                description: 'A T-Shirt',
                price: 50000,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                slug: 'jeans',
                name: 'Jeans',
                description: 'A Jeans',
                price: 45000,
                categoryId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                slug: 'smartwatch',
                name: 'Smartwatch',
                description: 'A Smartwatch',
                price: 950000,
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                slug: 'smartphone',
                name: 'Smartphone',
                description: 'A  Smartphone',
                price: 3345000,
                categoryId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Products', null, {});
    }
};