var express = require('express');

var router = express.Router();

router.get('/',(req, res, next) => {
	res.render('vwAdmin/DashBoardAdmin', {layout: false});
})

module.exports = router;