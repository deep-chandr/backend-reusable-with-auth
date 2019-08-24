import express from 'express';
import identifyUser from '../middlewares/identifyUser';
import { rootPath } from '../common/rootPath';
var router = express.Router();
const path = require('path');

router.get('/',  function(req, res) {
  const _path = path.join(rootPath ,'./src/views/test.html');
  res.render( "index" );
});

router.post('/', function(req, res) {
  res.json({ status : true, msg : "test me" });
});

module.exports = router;

