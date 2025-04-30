const mongoose=require('mongoose');
const student=new mongoose.Schema({
    id:{type:Number,required:true},
    name:{type:String,required:true},
    age:{type:Number,required:true}
})
const studentSchema=mongoose.model('student',student);
module.exports=studentSchema;