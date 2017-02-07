const mysql = require('mysql');
const connection = mysql.createConnection({
  host:'localhost',
  database: 'synapsepayinterview',
  user: 'root',
  password: ''
});

connection.connect((err) => {
  if(err) {
    console.log(`An error occured attempting to connect, ${err}`);
  } else {
    console.log(`Successfully connected to DB`);
  }
});

module.exports = connection;
