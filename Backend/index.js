require("dotenv").config()
const express = require("express")
const app = express();
const cors = require('cors')
const PORT = 8080
app.use(cors())
const router = (require("./router/auth-router"))
const connetToDb = require("./utils/db")
app.use(express.json())
app.use("/auth",router)
app.get("/",(req,res)=>{
  res.status(200).send("welcome to backend")
})
connetToDb().then(()=>{
    app.listen(PORT,()=>{
      console.log(`server is running in port ${PORT}`)
    })
  })
