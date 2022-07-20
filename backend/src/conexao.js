const { Pool } = require('pg');

const pool = new Pool({
    user: "user",
    host: "localhost:8000",
    database: "dindin",
    password: "postgres",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

const query = (text, param) => {
    return pool.query(text, param);
}

module.exports = { query };