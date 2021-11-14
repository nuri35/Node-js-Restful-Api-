//const express = require("express")
const mongoose = require("mongoose")
const User  = require("./../models/usermodel")
const authomiddleweare = require("./../middleweare/authomiddleweare")
const adminMiddleweare = require("./../middleweare/adminMiddleweare")
var createError = require('http-errors')
const bcrypt = require('bcrypt');
const userController = require("./../controller/usercontroller")





const router = require("express").Router() 



router.get("/me", authomiddleweare,userController.selfuser)

router.get("/",[authomiddleweare,adminMiddleweare],userController.alluserget)


router.post("/login",userController.userlogin)




router.post("/",userController.createnewuser)




router.patch("/me", authomiddleweare,userController.selfupdate)
    




router.patch("/:id",userController.adminupdate)



router.delete("/:id",[authomiddleweare,adminMiddleweare],userController.admindeleteuser)


router.get("/deleteAll",[authomiddleweare,adminMiddleweare],userController.alluserdelete)

router.delete("/medelete",authomiddleweare, userController.selfdelete )


module.exports = router 
