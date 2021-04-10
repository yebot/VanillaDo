const { Pool } = require('pg');
const connectString = `postgres://${process.env.PG_USER}:${process.env.PG_PASS}@${process.env.PG_SERVER}/${process.env.PG_DB}`;
const pool = new Pool({
  connectionString: connectString
});

/* 
  DB Schema:
    table = todo
      - id (primary key)
      - name (string)
      - done (boolean)
*/

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};