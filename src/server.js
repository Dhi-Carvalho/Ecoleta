const express = require("express")
const server = express()

//pegando o banco de dados
const db = require("./database/db")

//Configurar pasta public
server.use(express.static("public"))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
})

//configuração das rotas
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    //pegar os dados do db
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //mostrar a página html com os dados do db
        return res.render("search-results.html", { places: rows, total})
    })
    
})

//ligar o servidor
server.listen(3000)