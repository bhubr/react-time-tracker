const mysql = require('mysql')
const { promisify } = require('util')
const credentials = require('./credentials')
const connection = mysql.createConnection(credentials)
const query = promisify(connection.query.bind(connection))
module.exports = query
