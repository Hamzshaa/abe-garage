const mysql = require("mysql2/promise");

const dbConfig = {
  // socketPath: process.env.DB_SOCKET_PATH,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  connectionLimit: 10,
};


const pool = mysql.createPool(dbConfig);
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

module.exports = { query };
