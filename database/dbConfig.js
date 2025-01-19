const Database = require('better-sqlite3');

// Create a connection to the SQLite database
const db = new Database('database.db', { verbose: console.log });

module.exports = db;