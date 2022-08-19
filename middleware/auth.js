const jwt = require("jsonwebtoken")
const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse")

exports.protect = async(req,res,next) =>{
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        // Bearer 213nj4iolmif
        token=req.headers.authorization.split(" ")[1]
    }
    if (!token){
        return next(new ErrorResponse("Not authorization to access this route",401));

    }
    try {
       const decoded = jwt.verify(token,process.env.JWT_SECRETE)
       const user = await User.findById(decoded.id)
       if (!user){
        return next(new ErrorResponse("No user found with this id",404 ))
       }
       req.user =user;
       next();
    } catch (error) {
        return next(new ErrorResponse("Not authorizied to access this route",404))
    }
}