'use strict'

const express = require('express')
const pendudukController = require('../controllers/penduduk.controller')
const router = new express.Router();
const {checkToken} = require("../auth/token_validation")

router.get("/",checkToken,pendudukController.index)
router.post("/post", pendudukController.post)
router.delete("/delete", pendudukController.delete)
router.put("/update", pendudukController.put)
router.post("/registrasi", pendudukController.registrasi)
router.post("/login", pendudukController.login)

module.exports = router