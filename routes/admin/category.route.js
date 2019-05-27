// var express = require('express');
// var categoryModel = require('../../models/category.model');

// var router = express.Router();

// router.get('/',(req, res) => {	
// 	var p = categoryModel.all();
// 	p.then(rows => {
// 		console.log(rows);
// 		res.render('admin/DashboardAdmin', {
// 			category: rows	
// 		});
// 		//res.end('admin category');
// 	}).catch(err => {
// 		console.log(err);
// 	});
// })


// router.get('/add',(req, res) => {
// 	res.end('admin categories add');
	
// })

// module.exports = router;