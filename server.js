const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors");
const path = require('path');
const user = require('./routes/user')
require("dotenv").config({
    path: "./.env",
  });

const app = express()

app.use(express.json())
app.use(cors());
app.use(express.static('build'))
const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_CONNECTION_STRING) 
  .then(() => console.log("connected to MongoDB....."))
  .catch((err) =>
    console.log("Error occured while connecting mongodb....", err)
  );

app.use('/users',user)
app.use('/',(req,res,next)=>{
    console.log("sending react app")
    res.sendFile(path.join(__dirname,'build','index.html'))
    next()
})

app.listen(port,()=>console.log(`server is running on port no ${port}`))