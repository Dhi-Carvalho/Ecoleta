function pageLanding(req,res) {
    return res.render("index.html")
}

function createPoint(req,res) {
    return res.render("create-point.html")
}

function searchResults(req,res) {
    const search = req.query.search
    if(search == "") {
        return res.render("search-results.html", {total: 0})}
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
            }
        const total = rows.length
        return res.render("search-results.html", { places: rows, total: total})
    })
}

function savePoint(req,res) {
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
            if(err) {
                console.log(err)
                return res.send("Erro no cadastro!")
            }
    
            console.log("Cadastrado com sucesso")
            console.log(this)
            return res.render("create-point.html", {saved: true})
        }

    db.run(query, values, afterInsertData)

}

const express = require("express")
const server = express()

const db = require("./database/db")

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server
.use(express.static("public"))
.use(express.urlencoded({ extended: true }))

.get("/", pageLanding)
.get("/create-point", createPoint)
.get("/search", searchResults)

.post("/savepoint", savePoint)

.listen(3000)