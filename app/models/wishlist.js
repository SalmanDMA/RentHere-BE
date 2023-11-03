const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wishlist.belongsTo(models.Users, { foreignKey: 'userId' });
      Wishlist.belongsTo(models.Cars, { foreignKey: 'carId', constraints: false });
      Wishlist.belongsTo(models.Bikes, { foreignKey: 'bikeId', constraints: false });
    }
  }
  Wishlist.init({
    userId: DataTypes.INTEGER,
    carId: DataTypes.INTEGER,
    bikeId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};
