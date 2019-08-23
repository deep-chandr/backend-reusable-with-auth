import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import config from '../../config';
import * as errMsg from '../common/errMsg';

const jwt_sign = promisify(jwt.sign);
const jwt_verify = promisify(jwt.verify);

const jwtSign = async (props, cb) => {
    const {email, name, role} = props;
    try{
        if(!email || !name || !role) throw errMsg.INCOMPLETE_ARGUMENTS;
        const token = await jwt_sign({ email, name, role }, config.JWT_SECRET, { expiresIn: '1h' });
        return cb(null, token);
    }catch(err){
        return cb(err);
    }
}

const jwtVerify = async (props, cb) => {
    const {token} = props;
    try{
        if(!token) throw errMsg.INCOMPLETE_ARGUMENTS;
        const user = await jwt_verify(token, config.JWT_SECRET);
        return cb(null, user);
    }catch(err){
        return cb(err);
    }
}


const jwtServices = {
    sign : promisify(jwtSign),
    verify : promisify(jwtVerify)
}

export default jwtServices;