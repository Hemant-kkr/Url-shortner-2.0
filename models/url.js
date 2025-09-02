const mongoose =require('mongoose');
const USER=require('./user')
const urlSchema = new mongoose.Schema({
    shortId:{
        type:String,
        required:true,
       unique:true,
    },
    redirectURL:{
         type:String,
        required:true,
    },
     createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:USER,
        default:null
     }

},
{
    timestamps:true
}
)
// Fast lookups by shortId
// urlSchema.index({ shortId: 1 });
const URL = mongoose.model('url',urlSchema)
module.exports=URL; 