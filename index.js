
const express = require("express")
const database = require("./db/database")
const hatamıddleweare = require("./middleweare/hatamiddleweare")

const bcrypt = require('bcrypt');


const routeruser = require("./router/user")


const app = express();



const verıtabanı = database.main();
verıtabanı()


app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/users",routeruser)





app.use(hatamıddleweare)



app.listen(3000,()=>{
    console.log("bu port dınlenıyor")
})


