var express = require('express');
var articleModel = require('../models/article.model');
var category = require('../models/category.model');
var category2 = require('../models/category2.model');
var commentModel = require('../models/comment.model')

var router = express.Router();

router.get('/:id',(req, res) => {	
	var id = req.params.id;
	var cname; //bien luu ten chuyen muc
	category.findName(id).then(rows => {
		cname = rows[0].name
	});
	articleModel.allByCat(id)
	.then(rows => {
			res.render('vwArticleList/newsbyCat', {
				articles: rows,
				cname: cname
			});
	}).catch(err => {
		console.log(err);
	});
})

router.get('/:id/:id2',(req, res) => {	
	var id2 = req.params.id2;
	var cname; //bien luu ten chuyen muc
	category2.findName(id2).then(rows => {
		cname = rows[0].name
	});
	articleModel.allByCat2(id2)
	.then(rows => {
		res.render('vwArticleList/newsbyCat', {
			articles: rows,
			cname: cname
		});
	}).catch(err => {
		console.log(err);
	});
})

module.exports = router;