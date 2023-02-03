const express=require("express")
const app=express();
const cors=require("cors")
const authRoutes=require("./auth/routes")
const router=express.Router();
const properties=require("./config/prop")
const db=require("./config/db")
app.listen(properties.PORT,()=>console.log("Server running on", properties.PORT))

db();
app.use(cors())
const bodyParser=require("body-parser")
const bodyParserJSON=bodyParser.json()
const bodyParserURLEncoded=bodyParser.urlencoded({extended:true})

app.use(bodyParserJSON)
app.use(bodyParserURLEncoded)
app.use("./api",router)
authRoutes(router)
router.get("/", (req,res)=>{
res.send("hello from home")
})
app.use(router)

