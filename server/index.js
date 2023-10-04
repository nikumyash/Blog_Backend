const express = require('express');
require('dotenv').config();
const connectDB = require('./config/db.config')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3000
const app = express();
connectDB();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true })); 
app.use(fileUpload({
    useTempFiles:true,
}))

app.use('/api/user',require('./routes/user.route'))
app.use('/api/',require('./routes/post.route'));
app.use('/api/categories',require('./routes/category.route'));
// app.use('/api/test',require('./routes/test.route'));

app.use('*',(req,res)=>{
    res.status(404).json({success:false,error:"Page not found"})
})

app.listen(PORT,()=>{
    console.log('Currently listening to PORT ',PORT);
})