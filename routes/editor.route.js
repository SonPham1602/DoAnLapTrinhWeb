var express = require('express');

var router = express.Router();

router.get('/',(req, res, next) => {
	res.render('vwEditor/DashBoardEditor', {layout: false});
})

module.exports = router;