/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('admin@gmail.com', 10);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: hashedPassword1,
        role: 'user',
        address: '123 Main St',
        phoneNumber: '555-123-4567',
        profilePicture: 'john.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ADMIN',
        email: 'admin@gmail.com',
        password: hashedPassword2,
        role: 'ADMIN',
        address: '456 Elm St',
        phoneNumber: '555-987-6543',
        profilePicture: 'jane.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
