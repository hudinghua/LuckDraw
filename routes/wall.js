var express = require('express');
var router = express.Router();


/* GET home page. */
router.post('/wall', function(req, res, next) {
	var query = req.query;
  	res.send('respond with a resource');
});

module.exports = router;