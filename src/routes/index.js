import express from 'express';
import checkAuth from '../middlewares/checkAuth';
import identifyUser from '../middlewares/identifyUser';

const router = express.Router();

router.get('/', checkAuth, identifyUser , (req, res, next) => res.render( "index" ) );

module.exports = router;

