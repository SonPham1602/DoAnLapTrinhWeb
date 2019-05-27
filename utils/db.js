

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
  }
};