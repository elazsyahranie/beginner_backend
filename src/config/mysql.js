const mysql = require('mysql2')
require('dotenv').config()

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jualkarcis'
})

connection.connect((error) => {
  if (error) throw error
  console.log("You're now connected...")
})

module.exports = connection
