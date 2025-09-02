const mongoose =require('mongoose');
const URL =require('./url');
const linkSchema = mongoose.Schema({
    url:{
        type: mongoose.Schema.Types.ObjectId,
        ref:URL
    },
    country:String,
    device:String,
    
},
{
    timestams:true
}
)
const CLICKS = new mongoose.model('click',linkSchema);
module.exports= CLICKS;
