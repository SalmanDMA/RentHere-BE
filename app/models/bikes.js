const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Bikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Bikes.hasMany(models.Testimonials, { foreignKey: 'bikeId' });
      Bikes.hasMany(models.Transactions, { foreignKey: 'bikeId' });
      Bikes.hasMany(models.Wishlist, { foreignKey: 'bikeId' });
    }
  }
  Bikes.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Bikes',
  });
  return Bikes;
};
