const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");

// Import db models, define the associations and create the models into database
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");


const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// db.execute("SELECT * FROM products")
// .then((result) => {
//     console.log(result[0]);
// }).catch((err) => {
//     console.log(err);
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user
    //   console.log("app.js", req.user);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
  
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//  define model relations

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE"});
User.hasMany(Product); 
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product , {through : CartItem})
Product.belongsToMany(Cart, {through : CartItem})
Order.belongsTo(User)
User.hasMany(Order)
Order.belongsToMany(Product, {through : OrderItem})




// create model(s) into the database
// create a user
sequelize
  .sync({force:true}) // We may pass { force: true } to create new relatins but don't use force in production
  .then((result) => {
    // console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Abdul", email: "ab@protonmail.com" });
    }
    return user;
  })
  .then((user) => {
    return user.createCart()
  })
  .then(cart =>{
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
