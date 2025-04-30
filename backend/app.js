const express = require('express')
const cors = require('cors')
const database = require('./database')
const student=require('./studentmodel')
 const fs= require('fs/promises')
const app = express()
 let users =[];
database();
app.use(express.json())
app.use(cors())
// const readdata=async ()=>{
//     users=JSON.parse(await fs.readFile('./data.json','utf8'))
// }
// const writedata=async ()=>{
//    await fs.writeFile('./data.json',JSON.stringify(users))
// }
// readdata();
app.get('/users', async (req, res) => {
    //res.json(users);  
    try{
        res.status(200).json(await student.find())
    } 
    catch(err){
        res.status(500).json({message: err.message})
    }
})
app.post('/users',async(req,res)=>{
    // const {name,age}=req.body;
    // const newid=users.length>0?users[users.length-1].id+1:1;
    // const newuser={id:newid,name,age};
    // users.push(newuser);
    // writedata();
    // res.status(200).json({message: 'user register success',data: newuser});
    try{
        const sdata=req.body;
        let id=parseInt(Math.random()*1000);
        sdata.id=id;
        await student.create(sdata);
        res.status(200).json({message: 'data successfully add'});

    }catch(err){
        res.status(500).json({message: err.message});
    }
})
app.put('/users/:id',async(req,res) => {
    // const uid=req.params.id;
    // const {name,age}=req.body;
    // const userIndex=users.findIndex(user=>user.id==uid);
    // if(!name || !age) {
    //     res.status(400).json({message: 'name and age are required'});
    //     return;
    const uid=req.params.id;
    const {name,age}=req.body;
    const data =await student.findOne({id:uid});
    if(data==null){
        res.json({message: 'data is not found'});
    }
    await data.updateOne({name:name,age:age});
    res.json({message: 'data updated successfully'});
})
//     if(userIndex==-1){
//         console.log(userIndex)
//         res.status(404).json({message: 'user not found'});
//     }
//     else{
//         users[userIndex].name=name;
//         users[userIndex].age=age;
//         writedata();
//         res.status(200).json({message: 'user updated successfully',data: users[userIndex]});
//     }  


app.delete('/users/:id',(req,res) => {
    const uid=req.params.id;
    const userIndex=users.findIndex(user=>user.id==uid);
    if(userIndex==-1){
        res.status(404).json({message: 'user not found'});
    }
    else{
        users.splice(userIndex,1);
        writedata();
        res.status(200).json({message: 'user deleted successfully',data: users[userIndex]});
    }  
})
app.listen(9000,()=>{
    console.log('Server is running on port 9000')
});