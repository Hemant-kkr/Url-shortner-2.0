const USER =require('../models/user');
const bcrypt = require('bcryptjs')
async function signUp(req,res){
     const body= req.body;
    
     if(!body) return res.send('body required');
     const isExisting =await USER.findOne({email:body.email})
     if(isExisting) {
     return res.json({Status:"USer already existed with this email"})
     }
     const hashPassWord =await bcrypt.hash(body.password,10);
     const user = await USER.create({username:body.username,email:body.email,password:hashPassWord,role:'user'})
    return res.json({signUP:'sucess',createdUser:user});
}
async function login(req,res){
    const body = req.body;
    
    if(!body) {return res.json({status:"body required"});}
    const isUser = await USER.findOne({email:body.email});
    if(!isUser) return res.json({status:"user not existed Kindly register"});
    if(!(await bcrypt.compare(body.password, isUser.password)))  return res.json({status:"Invalid pasword"});
     
    req.session.userId = isUser._id;
    req.session.email= isUser.email;
    req.session.role=isUser.role;
    return res.json({status:'sucess'});
}
module.exports={
    signUp, login
}