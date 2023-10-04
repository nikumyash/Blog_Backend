const mongoose = require('mongoose');

const connectDB = async ()=>{ 
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            dbName:process.env.DB_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connected to MongoDB', con.connection.host);
    }
    catch(e){
        console.log('Error :',e.message)
    }
}
module.exports =  connectDB;