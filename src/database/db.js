//importando d sqlite3
const sqlite3 = require("sqlite3").verbose()
//iniciando o objeto do banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

//utilizando o objeto do banco de dados
db.serialize(() => {
    //criando uma tabela com SQL
    /*db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    //inserindo dados na tabela
    const query = `
        INSERT INTO places (
            name,
            image,
            adress,
            adress2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        "Paperside",
        "http://localhost:3000/images/Papersider.jpg",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Pápeis e Papelão"
    ]

    function afterInsertData(err) {
            if(err) {
                return console.log(err)
            }
    
            console.log("Cadastrado com sucesso")
            console.log(this)
        }

    //db.run(query, values, afterInsertData)
    
    //consultando os dados da tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    })*/

    //deletando os dados da tabela
    db.run(`DELETE FROM places WHERE id = ?`, [3], function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso!")
    })
})