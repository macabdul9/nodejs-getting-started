const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//  define cart model

const Order = sequelize.define("order", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: {
      type:Sequelize.INTEGER,
      allowNull:false
  },

});

module.exports = Order;
