'use strict';

const { hashPassword } = require("../helpers");

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert('Categories', [
            {
                slug: 'apparel',
                name: 'Apparel',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                slug: 'electronics',
                name: 'Electronics',
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('Categories', null, {});
    }
};