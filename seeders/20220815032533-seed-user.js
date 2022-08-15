'use strict';
const fs = require('fs');
const { hashPassword } = require('../helper/bcryptjs');
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
    let users = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))
    users.forEach(user => {
      user.password = hashPassword(user.password)
      user.createdAt = new Date()
      user.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Users', users, {})
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
