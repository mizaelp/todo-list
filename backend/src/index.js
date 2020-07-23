const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const db = require("./database")

const app = express()
const HTTP_PORT = 3000
const FRONT_DIR = "../frontend"

// QUERIES
const SQL_SELECT_ALL = "SELECT * FROM todo_info"
const SQL_SELECT_ONE = "SELECT * FROM todo_info WHERE id = ?"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

// START SERVER
app.listen(HTTP_PORT, () => console.log(`Server running on port ${HTTP_PORT}`))

// SERVE FRONTEND
app.use("/", express.static(FRONT_DIR))

/**
 * @ROUTES
 * */
// GET ALL TODOS
app.get("/todos", (req, res) => {
    const params = []
    const allTodos = db.all(SQL_SELECT_ALL, params, (err, rows) => {
        if(err) {
            res.status(400).json({error: err.message})
            return
        }
        res.json(rows)
    })
})

// GET A TODO
app.get("/todos/:id", (req, res) => {
    const params = [req.params.id]
    db.get(SQL_SELECT_ONE, params, (err, row) => {
        if(err) {
            res.status(400).json({"error": err.message})
            return
        }
        res.json({
            "message": "sucess",
            "data": row
        })
    })
})