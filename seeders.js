/* eslint-disable global-require */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-await-in-loop */
const fs = require('fs');
const path = require('path');
const { sequelize } = require('./app/models');

const seedersDir = path.join(__dirname, 'app', 'seeders');

async function runSeeders() {
  try {
    const seederFiles = fs.readdirSync(seedersDir);

    for (const file of seederFiles) {
      if (file !== 'index.js') {
        const seeder = require(path.join(seedersDir, file));

        const { up, down } = seeder;

        if (up) {
          await down(sequelize.queryInterface, sequelize.Sequelize);
        }

        if (up) {
          await up(sequelize.queryInterface, sequelize.Sequelize);
        }

        console.log(`Seeder ${file} berhasil ditambahkan`);
      }
    }
    await sequelize.close();
    console.log('Proses seeding selesai.');
  } catch (error) {
    console.error('Gagal menjalankan data seeders: ', error);
  }
}

module.exports = runSeeders;
