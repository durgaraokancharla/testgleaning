/**
 * Database connection file.
 *
 * @author Raja Pattanayak
 */
var mysql = require('mysql');
var async = require('async');

var state = { pool: null, mode: null};

exports.connect = function(mode, callback) {
	state.pool = mysql.createPool({
    connectionLimit : GLOBAL.DB_MYSQL_LIMIT,
    host            : GLOBAL.DB_MYSQL_HOST,
    user            : GLOBAL.DB_MYSQL_USER,
    password        : GLOBAL.DB_MYSQL_PASSWORD,
    database        : GLOBAL.DB_MYSQL_DATABASE,
    multipleStatements: true
  });
	
	state.mode = mode;
	callback();
}

//Use pool directly
exports.get = function() {
  return state.pool
}

// Use the connection
exports.getConnection = function(callback) {
  var pool = state.pool
  if (!pool) return callback(new Error('Missing database connection.'));

  state.pool.getConnection(function (err, connection) {
    if (err) {
      console.error("This is error msg, when connecting to db: " + err);  
      connection.release();
      return callback(err);
    }
    console.log("from db config: connected as id: " + connection.threadId);
    callback(null, connection);
  });
}