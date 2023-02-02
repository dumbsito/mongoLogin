const express = require('express')
const {engine}=require("express-handlebars")
const myconnection=require("express-myconnection")
const mysql=require("mysql")
const session=require("express-session")
const bodyParser=require("body-parser")
const app = express()
const port = process.env.PORT || 3000;
var qs = require('querystring');

const { equal } = require('assert')
const path=require("path");



/*const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions)) */
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
// app.use(express.static('../dist/notes'))//set the static path 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}))

const connection=require("./db")
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.post("/register",(req,res)=>{

  connection.query("SELECT COUNT(*) AS cnt FROM users WHERE email = ? " , 
  req.body.email , function(err , data){
     if(err){
         console.log(err);
     }   
     else{
         if(data[0].cnt > 0){  
               console.log(" Already exist ")
               res.send({emailExist:true})
         }else{
             connection.query("INSERT INTO users SET ?" ,req.body, function(err , insert){
                 if(err){
                  console.log(" server error ",err)
                
                 }else{
                  console.log(" alta  existosa ")
                  res.send({emailExist:false})
                
                 }
             })                  
         }
     }
  })
  
     
  })

app.post("/login", (req,res)=>{


  const email= req.body.email;
  const password = req.body.password;
   connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
       if (error) {
  
           res.send({user:error});
        }else  {
                 console.log('The solution is:', results);
         if(results.length >0){
           if(results[0].password == password){
           res.send({user:"loginExitoso" });
        }
         else{
          res.send({user:"passwordIncorrect"});
        }
      }
          else{
               res.send({user:"notExists"});
            }
         }
  });
})


    /*connection.query("SELECT * FROM users WHERE email = ?",[email],(err,userData)=>{
        if(userData.length > 0){
            console.log("Email already exists!!");
            res.status(500).send('Hubo un error');
        }else{
            connection.query("INSERT INTO users SET ?" ,{name:name,surname:surname,email:email,password:passwordHash},async(error,results)=>{
                if(error){
                    console.log(error);
                }else{
                    console.log("ALTA EXITOSA")
                    res.status(200).send('Hubo un error');

                }
            })
        }
    })*/



      /*   bcrypt.compare(data.password,userData.password,(err,isMatch)=>{
          
           if(!isMatch){
                console.log("password incorrect");
                res.status(500);
            }else{
                console.log("login exitoso");
            }
         })*/


          /*   let passwordHash=await bcrypt.hash(req.body.password,8)
    const data={
     name:req.body.name,
     surname:req.body.surname,
     email:req.body.email,
     password:passwordHash
   }
   
   router.post('/event', (req, res, next) => {
  db.query(
    'INSERT INTO events (owner, name, description, date) VALUES (?,?,?,?)',
    [owner, req.body.name, req.body.description, new Date(req.body.date)],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({status: 'error'});
      } else {
        res.status(200).json({status: 'ok'});
      }
    }
  );
});
   
   */
   

/* const data=req.body;

   connection.query("SELECT * FROM users WHERE email = ?",data.email,(err,userData)=>{
    if(userData.length > 0){
      
         console.log("hello");
         userData.forEach(e=>{
        bcrypt.compare(data.password,e.password,(err,isMatch)=>{
          
           if(!isMatch){
            res.send({user:"passwordIncorrect"})
              
          
            }else{
              res.send({user:"loginExitoso"})
            console.log("login exitoso");
              }
            })
         });
     }   
       else{
        console.log("notExists!!");
        res.send({user:"notExists"})
      }
    })*/