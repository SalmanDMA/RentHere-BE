const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cars.hasMany(models.Testimonials, { foreignKey: 'carId' });
      Cars.hasMany(models.Transactions, { foreignKey: 'carId' });
      Cars.hasMany(models.Wishlist, { foreignKey: 'carId' });
    }
  }
  Cars.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    picture: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    rating: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};
