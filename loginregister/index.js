
 'use strict'

 const express = require("express");
 const expree = require("express");
 const cors = require("cors");
 const mysql = require("mysql");
 
 const app = express();
 app.use(cors())
 app.use(express.json());
 app.use(express.urlencoded({extended: true}));

const db = require ('./db')
db.connect(error => {
    if(error) throw error
    console.log ("Mysql Connected")
})

//endpoint
app.get("/", (req,res) => {
    res.send({
        message:"Berhasil menjalankan get",
        data: {
            description :
            "berhasil menampilkan data"
        }
    })
})

app.use("/penduduk",require('./routes/penduduk.route'))

const port = 8000;
app.listen(port , () => console.log (`berhasil ${port}` ))