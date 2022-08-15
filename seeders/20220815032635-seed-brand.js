'use strict';
const fs = require('fs')
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let brands = JSON.parse(fs.readFileSync('./data/brand.json', 'utf-8'))
    brands.forEach(brand => {
      brand.createdAt = new Date()
      brand.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Brands', brands, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
