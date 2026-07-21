const jwt = require("jsonwebtoken")
function getToken(headers){
    if(!headers["authorization"]) return null
    const [type,token] = headers["authorization"].split(" ")
    console.log(headers)
    console.log(headers["authorization"])
    return type === "Bearer" ? token : null
}


async function isAuth(req,res,next){
    const token = getToken(req.headers)
    console.log(req.headers)
    console.log(token)

    if(!token){
        return res.status(401).json({message:"premission denide"})
    }
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        console.log(payload)
        req.userId = payload.userId
        next()
    } catch (error) {
        console.log(error,"ეს ერორი მოდის მიდლვეარიდან")
        return res.status(401).json({message:"invalid token",error:error.message})
    }
}


module.exports = isAuth