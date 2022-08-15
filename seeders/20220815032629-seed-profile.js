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
    let profiles = JSON.parse(fs.readFileSync('./data/profile.json', 'utf-8'))
    profiles.forEach(profile => {
      profile.createdAt = new Date()
      profile.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Profiles', profiles, {})
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
