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
const SQL_UPDATE_DESC = "UPDATE todo_info SET description = coalesce(?, description) WHERE id = ?"
const SQL_UPDATE_STATUS = "UPDATE todo_info SET status = coalesce(?, status) WHERE id = ?"
const SQL_DELETE_ONE = "DELETE FROM todo_info WHERE id = ?"
const SQL_INSERT_ONE = "INSERT INTO todo_info (description, status) VALUES (?, false)"
const SQL_SELECT_LAST = "SELECT * FROM todo_info ORDER BY  id DESC LIMIT 1"

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
        if (err) {
            res.status(400).json({ error: err.message })
            return
        }
        res.json(rows)
    })
})

// GET A TODO
app.get("/todos/:id", (req, res) => {
    const params = [req.params.id]
    db.get(SQL_SELECT_ONE, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({
            "message": "sucess",
            "data": row
        })
    })
})

// GET THE LAST TODO
app.get("/last", (req, res) => {
    const params = []
    db.get(SQL_SELECT_LAST, params, (err, row) => {
        if(err) {
            res.status(400).json({error: err.message})
            return
        }
        res.json({
            "message": "sucess",
            "data": row
        })
    })
})

// CREATE A TODO - POST
app.post("/todos", (req, res) => {
    const erros = []
    // if (!req.body.description) {
    //     erros.push("No description specified")
    // }
    // if (!req.body.status) {
    //     erros.push("No status specified")
    // }
    if (erros.length) {
        res.status(400).json({ "error": erros.join(",") })
        return
    }
    const { description } = req.body
    db.run(SQL_INSERT_ONE, description, (err, result) => {
        if(err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({
            "message": "sucess",
            "data": description,
            "id": this.lastID
        })
    })
})

// UPDATE DESCRIPTION - PATCH
app.patch("/todos/desc/:id", (req, res) => {
    const description = req.body.description
    db.get(SQL_UPDATE_DESC, [description, req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({
            "message": "sucess",
            "data": row
        })
    })
})

// UPDATE STATUS - PATCH
app.patch("/todos/status/:id", (req, res) => {
    const status = req.body.status
    db.get(SQL_UPDATE_STATUS, [status, req.params.id], (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message })
            return
        }
        res.json({
            "message": "sucess",
            "data": row
        })
    })
})

// DELETE A TODO
app.delete("/todos/delete/:id", (req, res) => {
    db.run(SQL_DELETE_ONE, req.params.id, (err, result) => {
        if (err) {
            res.status(400).json({ "error": res.message })
            return
        }
        res.json({ "message": "deleted", rows: this.changes })
    })
})