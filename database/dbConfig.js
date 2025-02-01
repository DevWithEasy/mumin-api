const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to database
const dbPath = path.join(__dirname,'../database/hadith_bn.db');
const db = new sqlite3.Database(dbPath);

module.exports = db;