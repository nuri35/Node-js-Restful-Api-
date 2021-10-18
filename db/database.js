
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
        //schema kısmında unıq alanlar verdık onun ıcın hata almamak ıcın ındexler vermemız lazım otomatık bunu de coonect kısmında 2.parametre olarak {useCreateIndex:true} fakat schema alnında bırde ındex dedık ılk verıtabnaında onunla ılgılı ne sonuc aldıysan ona göre bunu koy bı bakalım 2 sı ne fark edıyor
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

