const mysql = require('mysql');
const config = require('./../config.json')


var connection = mysql.createConnection({
    'host': config.host,
    'user': config.user,
    'password': config.password,
    'database': config.database
});

connection.connect((err)=>{
    if(err) throw err;
    else{
        console.log("Connected");
    }
});

module.exports = connection;