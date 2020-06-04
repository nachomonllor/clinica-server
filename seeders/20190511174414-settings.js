const bcrypt = require('bcryptjs');
/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Settings', [{
    phone: '2299292',
    address: '2938283823',
    email: 'iii@clinikingos.com',
    facebook: 'https://www.facebook.com/#',
    twitter: 'https://www.twitter.com/#',
  }], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Settings', null, {}),
};
