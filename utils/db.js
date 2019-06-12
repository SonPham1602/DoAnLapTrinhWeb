

var mysql      = require('mysql');
var createConnection = () => {
  return mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1234',
  database : 'doubles'
  });
}
 
module.exports = {
  load: sql => {
    return new Promise((resolve, reject) => {
      var connection = createConnection();
      connection.connect();     
      connection.query(sql, (error, results, fields) => {
        if (error) 
          reject(error);
        else {
          resolve(results);
        }
        connection.end();
      });
    })
  },
  add: (tableName, entity) => {
    return new Promise((resolve, reject) => {
      var sql = `insert into ${tableName} set ?`
      var connection = createConnection();
      connection.connect();     
      connection.query(sql, entity, (error, value) => {
        if (error) 
          reject(error);
        else {
          resolve(value.insertId);
        }
        connection.end();
      });
    })
  }
};