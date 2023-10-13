const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transactions.belongsTo(models.Users, { foreignKey: 'userId' });
      Transactions.belongsTo(models.Cars, { foreignKey: 'carId', constraints: false });
      Transactions.belongsTo(models.Bikes, { foreignKey: 'bikeId', constraints: false });
    }
  }
  Transactions.init({
    userId: DataTypes.INTEGER,
    carId: DataTypes.INTEGER,
    bikeId: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    rental_duration: DataTypes.INTEGER,
    end_date: DataTypes.DATE,
    price_car: DataTypes.INTEGER,
    total_car: DataTypes.INTEGER,
    total_amount_car: DataTypes.INTEGER,
    price_bike: DataTypes.INTEGER,
    total_bike: DataTypes.INTEGER,
    total_amount_bike: DataTypes.INTEGER,
    total_cost: DataTypes.INTEGER,
    payment: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};
