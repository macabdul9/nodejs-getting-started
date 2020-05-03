// // connection using mysql2

// const mysql = require("mysql2")

// const pool = mysql.createPool({
    
//     host:'localhost',
//     user:'admin',
//     database:'node-complete',
//     password:'password'

// })

// module.exports = pool.promise()

//  connection using sequelize

const Sequelize = require("sequelize")

const sequelize = new Sequelize(
    "node-complete",
    "admin",
    "password",
    {
        dialect:"mysql",
        host:"localhost"
    }
)

module.exports = sequelize;