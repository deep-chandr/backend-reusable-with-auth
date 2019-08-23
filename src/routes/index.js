import express from 'express';
import identifyUser from '../middlewares/identifyUser';
var router = express.Router();

router.get('/', identifyUser,  function(req, res) {
  res.send('hello');
  res.end();
});

router.post('/', function(req, res) {
  res.json({ status : true, msg : "test me" });
});

module.exports = router;

