var express = require('express');
var router = express.Router();
import * as authController from '../controllers/authController';

const redirectHome = (req, res, next) => {
    if(req.session.user) return res.redirect('/');
    return next();
}

router.get('/register', redirectHome, authController.get_register );
router.post('/register', authController.post_register );

router.get('/signin', redirectHome, authController.get_signin );
router.post('/signin', authController.post_signin );

router.post('/signout', authController.signout );

module.exports = router;
