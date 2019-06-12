var express = require('express');
var articleModel = require('../models/article.model');
var category = require('../models/category.model');
var category2 = require('../models/category2.model');
var commentModel = require('../models/comment.model')

var router = express.Router();

router.get('/:id',(req, res) => {	
	var id = req.params.id;
	var page = req.query.page || 1;
	if (page < 1) page = 1;
	var next = Number(page) + 1;
	var pre = page - 1;
	var limit = 5;
	var offset = (page - 1) * limit; 

	Promise.all([
		articleModel.pageByCat(id, limit, offset),
		articleModel.countByCat(id),
		category.findName(id)
	])
	  .then(([rows,count_rows, cname]) => {

	  	var total = count_rows[0].total;
	  	var nPages = Math.floor(total / limit); 
	  	if (total % limit > 0) nPages++;
	  	var pages = [];
	  	for(i=1;i<=nPages;i++) {
	  		var obj = { value: i, active: i === +page};
	  		pages.push(obj);
	  	}
	   	res.render('vwArticleList/newsbyCat', {
				articles: rows,
				pages,
				next,
				pre,
				page,
				nPages,
				cname: cname[0].name
			});
	}).catch(err => {
		console.log(err);
	});
})

router.get('/:id/:id2',(req, res) => {	
	var id2 = req.params.id2;
	var page = req.query.page || 1;
	if (page < 1) page = 1;
	var next = Number(page) + 1;
	var pre = page - 1;
	var limit = 5;
	var offset = (page - 1) * limit;

	
	Promise.all([
		articleModel.pageByCat2(id2, limit, offset),
		articleModel.countByCat2(id2),
		category2.findName(id2)
	])
	  .then(([rows,count_rows,cname]) => {

	  	var total = count_rows[0].total;
	  	var nPages = Math.floor(total / limit);
	  	if (total % limit > 0) nPages++;
	  	var pages = [];
	  	for(i=1;i<=nPages;i++) {
	  		var obj = { value: i, active: i === +page};
	  		pages.push(obj);
	  	}
	   	res.render('vwArticleList/newsbyCat', {
				articles: rows,
				pages,
				next,
				pre,
				page,
				nPages,
				cname: cname[0].name
			});
	}).catch(err => {
		console.log(err);
	});
})

module.exports = router;