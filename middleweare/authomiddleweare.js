
const jwt = require('jsonwebtoken')
const createError = require('http-errors')

const auttokenverıfy = async (req,res,next)=>{
  
try{


    const tokensm =   req.header("Authorization").replace("Bearer ", "")


 const snc =   jwt.verify(tokensm,"sadsfdsfsd")

   

  
   req.usersm = snc;
  
    next() 


}catch(err){
    next(createError(400,err));
}
 

}

module.exports = auttokenverıfy;