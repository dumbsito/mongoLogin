const mysql= require("mysql")

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database:"nodelogin"
})

connection.connect((error)=>{
    if(error){
        console.log("el error es: " +error.stack);
        return;
    }
    console.log("conectado con exito")
})

module.exports=connection;