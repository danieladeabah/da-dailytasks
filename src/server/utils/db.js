import mysql from 'mysql2/promise'

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: process.env.DB_NAME
})

export default connection
