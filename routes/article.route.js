var express = require('express');
var articleModel = require('../models/article.model');
var commentModel = require('../models/comment.model')

var router = express.Router();

router.get('/:id',(req, res) => {	
	var id = req.params.id;
	var comments = new Array();
	commentModel.allByArt(id).then(rows => {
		if (rows.length > 0){
			for(const c of rows){
				comments.push(c);
			}
		}
	});
	articleModel.single(id)
	.then(rows => {
			res.render('vwArticle/newbyId', {
				article: rows[0],
				comments: comments
			});
	}).catch(err => {
		console.log(err);
	});
})
module.exports = router;