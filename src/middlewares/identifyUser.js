import jwtServices from '../services/jwtServices';
import User from '../models/userModel';
import config from '../../config';

const identifyUser = async (req, res, next) => {
    try {
        const token = req.headers[config.TOKEN];
        if(!token) return res.json({status : false, data : {}, msg : "No token present.", err: "No token present."});

        const user = await jwtServices.verify({ token });
        const email = user.email;
        
        const _user = await User.findOne({ email: email });
        req.user = _user;

        return next();
    } catch (err) {
        return res.json({ status: false, data: {}, msg: "Invalid token.", err: "Invalid token." })
    }
}

export default identifyUser;