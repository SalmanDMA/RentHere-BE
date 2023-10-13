const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Testimonials extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Testimonials.belongsTo(models.Users, { foreignKey: 'userId' });
      Testimonials.belongsTo(models.Cars, { foreignKey: 'carId', constraints: false });
      Testimonials.belongsTo(models.Bikes, { foreignKey: 'bikeId', constraints: false });
    }
  }
  Testimonials.init({
    userId: DataTypes.INTEGER,
    carId: DataTypes.INTEGER,
    bikeId: DataTypes.INTEGER,
    testimonial: DataTypes.TEXT,
    rating_bike: DataTypes.FLOAT,
    rating_car: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Testimonials',
  });
  return Testimonials;
};
