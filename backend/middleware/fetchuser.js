const jwt = require('jsonwebtoken');
const jwt_secret="lessgolessgo"

const fetchuser=(req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Please authenticate using correct token"})
    }
    const data=jwt.verify(token,jwt_secret)
    req.user=data.user;
    next();
}
module.exports=fetchuser;