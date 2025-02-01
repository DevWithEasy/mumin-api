const db = require("./dbConfig");

class DbCommand {
    static getBooks() {
        const sql = `SELECT * FROM books`;
        db.all(sql,[],(err, rows) =>{
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json(rows);
        })
    }
}

module.exports = DbCommand;