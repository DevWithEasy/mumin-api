const db = require("./dbConfig");

class DbCommand {
    constructor() {

    }

    static dbtableCount() {
        // Query the SQLite master table to get table names
        const query = `SELECT name 
    FROM sqlite_master 
    WHERE type = 'table' AND name NOT LIKE 'sqlite_%';`;

        const result = db.prepare(query).all();

        return result.map(row => row.name);
    }

    static dbtableDelete(tableName) {
        const query = `DROP TABLE IF EXISTS ${tableName};`;
    db.prepare(query).run();

    return { success: true, message: `Table "${tableName}"`}
    }
    static daroodTableCreate() {

        const createTableSQL = `
        CREATE TABLE IF NOT EXISTS darood (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL
        );
    `;

        // Execute the SQL statement to create the table
        db.exec(createTableSQL)
        console.log('Created table')
    }

    static addDarood(title, description) {
        const addDaroodSQL = `INSERT INTO darood (title, description) VALUES (?,?)`;
        addDaroodSQL
        const stmt = db.prepare(insertSQL);

        // Execute the statement with title and description as parameters
        const result = stmt.run(title, description);
        console.log(result);

    }
}

module.exports = DbCommand;