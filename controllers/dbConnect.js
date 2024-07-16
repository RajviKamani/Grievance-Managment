const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const app = express();


const sequelize = new Sequelize('complain', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

    sequelize.sync({force:false})

module.exports = sequelize;