var express = require('express');
var articleModel = require('../models/article.model');
var commentModel = require('../models/comment.model')
var category = require('../models/category.model');

var router = express.Router();

//load chi tiết bài viết và 1 số thứ liên quan
router.get('/:id',(req, res) => {	
	var id = req.params.id;
	Promise.all([
		commentModel.allByArt(id),
		articleModel.single(id)
	])
	.then(([comments,rows]) => {
		Promise.all([
		category.findName(rows[0].id_cat),
		articleModel.fiveByCat(rows[0].id_cat) //tìm 5 bài viết cùng chuyên mục
		])
		.then(([cname,five]) => {
			res.render('vwArticle/newbyId', {
			comments,
			article: rows[0],
			cname: cname[0].name,
			five
			})
		})
		.catch(err => {
			console.log(err);
		})
		var entity = {
		id: rows[0].id,
		view: Number(rows[0].view) + 1 
		}
		articleModel.update(entity)
	})
	.catch(err => {
		console.log(err);
	})
})

//xử lý cho comment trong bài viết
router.post('/:id',(req, res) => {
	var id = req.params.id;
	var entity = {
		id_art: id,
		date_comment: res.locals.datenowSql,
		content: req.body.content
	}
	commentModel.add(entity)
	.then(
		Promise.all([
		commentModel.allByArt(id),
		articleModel.single(id)
		])
		.then(([comments,rows]) => {
			res.render('vwArticle/newbyId', {
				comments,
				article: rows[0]
			})	
		})
		.catch(err => {
			console.log(err);
		})
	)
	.catch(err => {
		console.log(err);
	})
	

})

module.exports = router;