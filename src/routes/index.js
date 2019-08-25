import express from 'express';
import checkAuth from '../middlewares/checkAuth';

const router = express.Router();

router.get('/', checkAuth, (req, res, next) => res.render( "index" ) );

module.exports = router;

