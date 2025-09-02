const mongoose =require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type:String,required:true},
  email: {type:String, unique:true,required:true},
  password: {type:String,required:true},
  role: { type: String, default: 'user' }
},
{
    timestamps:true
}
)
const USER = mongoose.model('user',UserSchema);
module.exports=USER;