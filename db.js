
var mysql = require('mysql');
 
console.log('Get connection ...');
 
const con = mysql.createConnection({
  database: 'googlemeetanalyser',
  host: "localhost",
  user: "username",
  password: "password",
  port: 3337
});
 module.exports=con
