const mongoose = require('mongoose');
async function dbConn(){
    const conn=await mongoose.connect('mongodb+srv://ujjwalsingh8614:<db_root>@ujwalanand.mft1e2p.mongodb.net/crud-live-aiml?retryWrites=true&w=majority&appName=ujwalanand');
    if(conn){
        console.log('Database connected successfully');
    }
    else{
        console.log('Database connection failed');
    }   
}
module.exports=dbConn;