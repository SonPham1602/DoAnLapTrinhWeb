var express = require('express');
var articleModel = require('../models/article.model');
var category = require('../models/category.model');
var dateFormat = require('dateformat');

var router = express.Router();

//load các bài viết thuộc chuyên mục editor quản lý 
router.get('/:idcat',(req, res) => {
	var id_cat = req.params.idcat;
	//kiểm tra để chuyển bài viết chờ xuất bản thành đã xuất bản 
	articleModel.artEditor(id_cat, 1).then(arts1 => {
		for(var i = 0; i < arts1.length; i++) {
				if (dateFormat(arts1[i].date_post,"yyyy-mm-dd") == res.locals.datenowSql) {
					var entity = {
						id: arts1[i].id,
						status: 2
					}
					console.log(entity);
					articleModel.update(entity).catch(err => {
						console.log(err);
					})
				}
		}
	}).catch(err => {
		console.log(err);
	})

	Promise.all([
		articleModel.artEditor(id_cat, 1),
		articleModel.artEditor(id_cat, 2),
		articleModel.artEditor(id_cat, 3),
		articleModel.artEditor(id_cat, 4),
		category.findName(id_cat)
	])
	.then(([arts1 , arts2, arts3 ,arts4, cname]) => {
		res.render('vwEditor/DashBoardEditor', {
			layout: false,
			arts1,
			arts2,
			arts3,
			arts4,
			cname: cname[0].name	
		});
	})
	.catch(err => {
		console.log(err);
	})
})

//xử lí hiệu chỉnh & duyệt bài viết trên editor
router.get('/:idcat/:idart',(req, res) => {
	var id_art = req.params.idart;
	articleModel.single(id_art)
	.then(rows => {
		category.findName(rows[0].id_cat)
		.then(cname => {
			res.render('vwEditor/readArticle', {
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

router.get('/:idcat/:idart/refuse',(req, res) => {
	res.render('vwEditor/refuse', {
		layout: false,
		id_cat: req.params.idcat
	});
})
router.post('/:idcat/:idart/refuse',(req, res) => {
	var id_art = req.params.idart;
	var entity = {
		id: id_art,
		refuse: req.body.refuse,
		status: 3
	}
	articleModel.update(entity).then(
		res.redirect('/editor/' + req.params.idcat)
	).catch(err => {
		console.log(err);
	})
})
router.get('/:idcat/:idart/accept',(req, res) => {
	var id_art = req.params.idart;
	articleModel.single(id_art).then(rows => {
		category.findName(rows[0].id_cat)
		.then(cname => {
			res.render('vwEditor/correction', {
			layout: false,
			article: rows[0],
			cname: cname[0].name,
			})
		})
		.catch(err => {
			console.log(err);
		})
	})
})

router.post('/:idcat/:idart/accept',(req, res) => {
	var idart = req.params.idart;
	category.findId(req.body.namecat).then(rows => {
		var entity = {
		id: idart,
		image: req.body.img,
		image2: req.body.img,
		date_post: req.body.datepost,
		id_cat: rows[0].id,
		status: 1
		}
		articleModel.update(entity).then(
			res.redirect('/editor/' + req.params.idcat)
		).catch(err => {
			console.log(err);
		})
	}).catch(err => {
			console.log(err);
	})
})


module.exports = router;