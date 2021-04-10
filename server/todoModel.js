const { Pool } = require('pg');
const connectString = `postgres://${process.env.PG_USER}:${process.env.PG_PASS}@${process.env.PG_SERVER}/${process.env.PG_DB}`;
const pool = new Pool({
  connectionString: connectString
});

/*
Create a table in postgreSQL like this:

CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    name VARCHAR ( 255 ) NOT NULL,
    done BOOLEAN NOT NULL
);
*/

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};