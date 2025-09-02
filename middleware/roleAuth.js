async function checkRole(req,res,next){
if(req.session.userId && req.session.email && req.session.role)
  { next();}
    else{
       res.redirect('/login')
    }
  
}
module.exports=checkRole