var express = require('express');
var router = express.Router();
import * as authController from '../controllers/authController';

router.post('/register', authController.register );
router.post('/signin', authController.signin );
router.get('/signout', authController.signout );

module.exports = router;
