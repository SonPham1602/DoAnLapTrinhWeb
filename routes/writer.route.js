var express = require('express');
var articleModel = require('../models/article.model');

var router = express.Router();

router.get('/',(req, res) => {
	var id_writer = res.locals.id_account
	Promise.all([
		articleModel.artWriter(id_writer, 1),
		articleModel.artWriter(id_writer, 2),
		articleModel.artWriter(id_writer, 3),
		articleModel.artWriter(id_writer, 4)
	])
	.then(([arts1 , arts2, arts3 ,arts4, cname]) => {
		res.render('vwWriter/DashBoardWriter', {
			layout: false,
			arts1,
			arts2,
			arts3,
			arts4
		});
	})
	.catch(err => {
		console.log(err);
	})
	
})

module.exports = router;