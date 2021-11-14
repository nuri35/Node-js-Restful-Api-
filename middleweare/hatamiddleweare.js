

const errcatchım = (err,req,res,next)=>{
  
    res.status(err.status).json({
     
        err:err.status,
        sonuc:err.message
    })
    

}

module.exports = errcatchım;




