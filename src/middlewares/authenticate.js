import createHttpError from "http-errors";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

const Authenticate = (req,res,next)=>{
    const auth = req.header('Authorization');
    if(!auth){
         return next(createHttpError(401,'Not Authorized'));
    }

    try {
        const token = auth.split(' ')[1]
         console.log('token',token);
        const decoded = jwt.verify(token,config.secret_key);
        console.log('decoded',decoded)
        req.userId = decoded.sub;
        next();

    } catch (error) {
                 return next(createHttpError(401,error));
    }

}

export default Authenticate;