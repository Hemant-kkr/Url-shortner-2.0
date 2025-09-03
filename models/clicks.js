const mongoose =require('mongoose');
const URL =require('./url');
const linkSchema = mongoose.Schema({
    url:{
        type: mongoose.Schema.Types.ObjectId,
        ref:URL
    },
    country:String,
    city:String,
    Browser:String,
    device:String,
    
},
{
    timestamps:true
}
)
const CLICKS = new mongoose.model('click',linkSchema);
module.exports= CLICKS;
