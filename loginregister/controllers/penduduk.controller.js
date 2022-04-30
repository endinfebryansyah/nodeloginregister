'use strict'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

const secret = '#$@^%*&%$$@&';

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

module.exports ={
    index: (req, res) => {
        const sql = 'SELECT* FROM data_penduduk';
        db.query(sql, (err,result)=>{
            if (err) throw (err)
            res.json({
                message: "berhasil menampilkan",
                data: result


            })
        })
    },
    post: (req, res) => {
        let data = {
            nama: req.body.nama,
            alamat: req.body.alamat
        }
        let sql = "insert into data_penduduk SET ?";
        if(data.nama && data.alamat){
            db.query(sql, data, (err) => {
                if (err){
                    throw err
                }else{
                    res.json({
                        message: "berhasil menambahkan",
                        data
                    })
                }
            })
        }
    },
    delete: (req, res) => {
        let id = req.body.id;
        let data;
        if(id){
            let sql = "SELECT * from data_penduduk where id = ?"
            db.query(sql, [id], (err,result) => {
                if(err){
                    throw err;
                }else{
                    data = result;
                }
            })
        }
        if(id){
            let sql = "DELETE from data_penduduk where id = ?";
            db.query(sql, id, (err) => {
                if (err){
                    throw err
                }else{
                    res.json({
                        message: `ID ${id} berhasil dihapus.`,
                        data: data[0]
                    })
                }
            })
        }
    },
    put: (req, res) => {
        let id = req.body.id;
        let new_dt = {
            nama: req.body.nama,
            alamat: req.body.alamat
        }
        let old_dt;

        if(id){
            let sql = "SELECT nama,alamat FROM data_penduduk WHERE id = ?";
            db.query(sql, [id], (err,result) => {
                if(err){
                    throw err;
                }else{
                    old_dt = result;
                }
            })
        }        
        setTimeout(update, 1);
        function update (){
            if(old_dt){
                let sql = "UPDATE data_penduduk SET ? WHERE id = ?";
                db.query(sql, [new_dt, id], (err,result) => {
                    if(err){
                        throw err;
                    }else{
                        res.json({
                            message: `sukses mengubah data dengan id = ${id}`,
                            old_data: old_dt[0],
                            new_data: new_dt
                        })
                    }
                })
            }
        }
    },
    registrasi:(req, res) =>{
        const{
            namaa,
            email,
            password
        } = req.body
        if(!namaa, !email ||!password)res.status(402).json({message: 'namaa.email.password harus diisi'})
        return db.query('insert into pengguna set ?', {namaa, email, password:hashPassword(password)}, (err, result)=>{
            if (err)return res.status(500).json({err})
            return res.json({message:'registrasi berhasil', data:result})
        })

    },
    login: (req,res) =>{
        const { email, password } = req.body;
        if(!email || !password){
            res.status(402).json({
                message: "diperlukan email dan password"
            })
        }else{
            return db.query('select * from pengguna where email = ?', email, (err, result) => {
                if(err){
                    return res.status(500).json({err})
                }else{
                    if(result.length > 0){
                        const user = result[0];
                        if(bcrypt.compareSync(password, user.password)){
                            const token = jwt.sign({ id_akun: user.id_akun }, secret);
                            return res.json({
                                message: "berhasil login",
                                data: {
                                    token,
                                    user
                                }
                            })
                        }else{
                            return res.status(401).json({
                                message: "password salah"
                            })
                        }
                    }else{
                        return res.status(401).json({
                            message: "Email tidak ditemukan"
                        })
                    }
                }
            })
        }
    } 
    
}



