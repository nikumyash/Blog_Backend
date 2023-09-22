const express = require('express');
require('dotenv').config();
const connectDB = require('./db/dbConnection')
const cookieParser = require('cookie-parser')

const PORT = process.env.PORT || 3000
const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); 

app.get('/',(req,res,next)=>{
    res.send("Hello world")
})
app.use('/api/test',require('./routes/test.route'))
app.use('*',(req,res)=>{
    res.status(404).json("Page not found")
})

app.listen(PORT,()=>{
    console.log('Currently listening to PORT ',PORT);
})