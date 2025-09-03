async function isLogged(req,res,next){
if(req.session.userId || req.session.email || req.session.role ||  req.session.isLogged)
  { 
    res.redirect('/')
  }
    else{
      next()

    }
  
}
module.exports=isLogged;  