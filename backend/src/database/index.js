const sqlite3 = require("sqlite3").verbose()

const DBSOURCE = "../backend/src/database/db.sqlite"

// QUERIES
const CREATE_DB = `CREATE TABLE todo_info (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    description text,
                    status boolean)`

const INSERT = `INSERT INTO todo_info 
                    (description, status)
                    VALUES (?, ?)`

const db = new sqlite3.Database(DBSOURCE, err => {
    if(err) {
        console.error(err.message)
        throw err
    } else {
        console.log("Connected to the SQLite database")
        db.run(CREATE_DB, err => {
            if(err) {
                console.log("Table already created")
            } 
            // else {
            //     // Table just created, creating some rows
            //     db.run(INSERT, ["Teste1", false])
            // }

        })
    }
}) 

module.exports = db