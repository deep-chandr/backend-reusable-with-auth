import * as errMsg from "../common/errMsg";
import userModelServices from '../services/userModelServices';
import crypticServices from '../services/crypticServices';
import jwtServices from '../services/jwtServices';
import config from '../../config';

export const register = async (req, res, next) => {
    const {name, email, password, role } = req.body;
    if(!name || !email || !password || !role) 
        return res.json({ status : false, data : {}, msg : errMsg.INCOMPLETE_ARGUMENTS, err: errMsg.INCOMPLETE_ARGUMENTS });
    try{
        const _user = {
            name, email, password, role
        };
        const new_user = await userModelServices.add(_user);
        return res.json({status : true, data : {user : new_user}, msg : "User added successfully."});
    }catch(err){
        return res.json({status : false, data : {}, msg : "Unable to add User.", err : err.toString() });
    }
}

export const signin = async (req, res, next) => {
    const {email, password } = req.body;
    //validate mail everywhere
    if( !email || !password ) 
        return res.json({ status : false, data : {}, msg : errMsg.INCOMPLETE_ARGUMENTS, err: errMsg.INCOMPLETE_ARGUMENTS });
    try{
        const new_user = await userModelServices.getByEmail({email});
        const is_pass_true = await crypticServices.verify({hash : new_user.password, password : password});
        if(!is_pass_true){
            return res.json({status : false, data : {}, msg : "Wrong password", err : "Wrong password" });
        }
        // get token
        const token = await jwtServices.sign(new_user);
        return res.json({status : true, data : {user : new_user, [config.TOKEN]: token }, msg : "Successfully logged in."});
        
    }catch(err){
        return res.json({status : false, data : {}, msg : "Unable to signIn.", err : err.toString() });
    }
}

export const signout = async (req, res, next) => {
    res.json({status : true, data : {}, msg : "signout working"});
}
