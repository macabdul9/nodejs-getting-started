const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const User = require('./models/user');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5ec23e62d8e1a44da4d4324f')
    .then(user => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch(err => console.log(err));
    // next()
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


mongoose.connect(
  'mongodb+srv://abdul:abdul@nodejs-db-xx3ji.mongodb.net/shop?retryWrites=true&w=majority',
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  }
)
.then(client => {
  User.findOne().then(user => {
    // console.log("app.js", user)
    if(!user){
      const user = new User({
        name:"Abdul",
        email:"e.abdul@protonmail.com",
        cart:{
          items:[]
        }
      });
      user.save();
    }
  })
  app.listen(3000)
  console.log("CONNECTED TO DB")
})
.catch(err => {
  console.log(err)
})
