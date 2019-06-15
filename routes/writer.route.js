var express = require('express');
var articleModel = require('../models/article.model');
var category = require('../models/category.model');

var router = express.Router();

router.get('/:id',(req, res) => {
	var id_writer = req.params.id;
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

//xử lí post bài viết cho writer
router.post('/:id', (req, res) => {
	var id = req.params.id;
	category.findId(req.body.namecat).then(rows =>{
		var entity = {
		id_writer: Number(id),
		date_post: res.locals.datenowSql,
		title: req.body.title,
		abstract: req.body.abstract,
		content: req.body.content,
		id_cat: rows[0].id,
		// tag: req.body.tag,
		status: 4
		}
		// console.log(entity);
		articleModel.add(entity)
		.then(
			res.redirect(id)
		)
		.catch(err => {
			console.log(err);
		})
	}).catch(err => {
		console.log(err);
	})
})

//xử lí hiệu chỉnh bài viết
router.get('/:id/:idart',(req, res) => {
	var id_art = req.params.idart;
	articleModel.single(id_art)
	.then(rows => {
		category.findName(rows[0].id_cat)
		.then(cname => {
			res.render('vwWriter/correction', {
			layout: false,
			article: rows[0],
			cname: cname[0].name,
			})
		})
		.catch(err => {
			console.log(err);
		})
	})
	.catch(err => {
		console.log(err);
	})
})

//chỉnh sửa bài viết trong hiệu chỉnh
router.post('/:id/:idart', (req, res) => {
	var id = req.params.id;
	var id_art = req.params.idart;
	console.log(req.body.namecat);
	category.findId(req.body.namecat).then(rows =>{
		var entity = {
		id: Number(id_art),
		id_writer: Number(id),
		date_post: res.locals.datenowSql,
		title: req.body.title,
		abstract: req.body.abstract,
		content: req.body.content,
		id_cat: rows[0].id,
		// tag: req.body.tag,
		status: 4
		}
		console.log(entity);
		articleModel.update(entity)
		.then(
			res.redirect('/writer/' + id)
		)
		.catch(err => {
			console.log(err);
		})
	}).catch(err => {
		console.log(err);
	})
})

module.exports = router;