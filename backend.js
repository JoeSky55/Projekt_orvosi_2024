const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())
app.use(express.json())

var connection

function kapcsolat()
{
    connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'fogorvos_vizsga'
    })

    connection.connect()    
}

app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/orvosAdatok', (req, res) => {
    kapcsolat()
    connection.query('SELECT orvosok.nev, orvosok.telefon, szakteruletek.szak_nev, szakteruletek.szak_nev FROM orvosok INNER JOIN orvos_szakterulet ON orvosok.orvos_id = orvos_szakterulet.orvos_id INNER JOIN szakteruletek ON orvos_szakterulet.szakterulet_id = szakteruletek.szak_id WHERE orvosok.orvos_id = 1 GROUP BY orvosok.orvos_id', (err, rows, fields) => {
        if (err) {
            console.log(err)
            res.status(500).send("Hiba")
        }
        else{
            console.log(rows)
            res.status(200).send(rows)
        }
      })
      connection.end()
  })



//******************************************************
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})