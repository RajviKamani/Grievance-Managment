'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Complain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Complain.init({
    complain: DataTypes.STRING,
    doc: DataTypes.STRING,
    deleteAt:DataTypes.DATE,
    status: {
      type: DataTypes.ENUM('open', 'closed', 'in_progress'), // Example status values
      allowNull: false,
      defaultValue: 'open'
  },
  }, {
    sequelize,
    modelName: 'Complain',
  });
  return Complain;
};