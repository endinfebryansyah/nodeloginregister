const{verify} = require('jsonwebtoken');
const secret = '#$@^%*&%$$@&';

module.exports={
    checkToken:(req,res,next)=>{
        let token = req.get("authorization");

        if(token){
            let wow = token.slice(7)
            verify(wow,secret,(err,decoded)=>{
                if(err){
                    res.json({
                        succsess:0,
                        message:"login first"
                    })

                }else{
                    let user = decoded.result
                    next( )

                }
            })
        
        }else{
            res.json({
                succsess:0,
                message:"access denided: unauthorized user"
            })
        }
    }
}

