const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'myfirstbdd'
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

module.exports = connection;