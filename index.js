require('dotenv').config()
require('./db.js')
const express = require("express")
const app = express()
const cors = require("cors")
const router = require('./router.js')

app.use(cors({
  origin: 'https://front-sand-alpha.vercel.app/', // allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json())
app.use(router)

app.get('/',(req,res)=>{
    res.send("server created") 
})

const PORT = 3005 

app.listen(PORT,()=>{
    console.log(`SERVER RUNNING ${PORT}`);
    
})
