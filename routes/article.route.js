var express = require('express');
var articleModel = require('../models/article.model');
var commentModel = require('../models/comment.model')

var router = express.Router();

router.get('/:id',(req, res) => {	
	var id = req.params.id;
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
})

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
			console.log(comments);
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