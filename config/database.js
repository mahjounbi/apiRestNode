const mariadb = require('mariadb')

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'techniquetest'
})

// Connect and check for errors

pool.getConnection((error, connection) => {
  if (error) {
    console.log('connection failed')
  }
  if (connection) connection.release()
})

module.exports = pool
