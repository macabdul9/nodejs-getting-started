const mongodb = require("mongodb")

const mongoConnect = callback => {

  const MongoClient = mongodb.MongoClient;
  uri = 'mongodb+srv://abdul:t78w2jvXZhnKHRm9@nodejs-db-xx3ji.mongodb.net/test?retryWrites=true&w=majority'
  new MongoClient(uri, { useUnifiedTopology: true }).connect()
  .then(client => {
    console.log("CONNECTED");
    callback(client)
  })
  .catch(err => {
    console.log(err);
  })

} 

module.exports = mongoConnect;

