const mongodb = require("mongodb")

let _db;
const mongoConnect = callback => {

  const MongoClient = mongodb.MongoClient;
  uri = 'mongodb+srv://abdul:abdul@nodejs-db-xx3ji.mongodb.net/shop?retryWrites=true&w=majority'
  new MongoClient(uri, { useUnifiedTopology: true }).connect()
  .then(client => {
    console.log("CONNECTED");
    _db = client.db('shop');
    callback(client)
  })
  .catch(err => {
    console.log(err);
    throw err;
  })
} 

const getDb  = () => {
  if(_db){
    return _db;
  }
  throw "No database found";
}

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

