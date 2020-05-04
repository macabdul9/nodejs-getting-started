const Sequelize = require("sequelize");
const sequelize = require("../util/database");

//  define cart model

const CartItem = sequelize.define("cartItem", {
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

module.exports = CartItem;
