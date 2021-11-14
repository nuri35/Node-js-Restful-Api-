
const mongoose = require("mongoose")



 function main() {
  

      let counter = 0;
       
      return async function (){
          
          if(counter > 0){
            console.log("db baglantısı zaten vvar")
          return;
      }else{
      
           counter++;  
           try{
      
      await mongoose.connect('mongodb://localhost:27017/rest');

   
      console.log("hello burdayım")
          console.log("baglantı salandı");
          console.log(mongoose.connection.readyState)


           }catch(err){
            console.log(err+"baglantı saglanamadı")
        }
      } 
          
      
      }


  }


 

module.exports = {
  main

};

