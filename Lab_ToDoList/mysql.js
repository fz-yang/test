const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port:"3370",
  user: 'root',
  password: 'root',
  database:"lab2023",
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ', error);
    return;
  }
  console.log('Connected to database.');
});

module.exports = {
  connection: connection
};