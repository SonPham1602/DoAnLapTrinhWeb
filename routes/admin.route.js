var express = require('express');
var articleModel = require('../models/article.model');
var category = require('../models/category.model');
var category2 = require('../models/category2.model');
var user = require('../models/user.model');
var usertype = require('../models/usertype.model');
var editor = require('../models/editor.model')
var router = express.Router();

//load tất cả bài viết
router.get('/:idad',(req, res, next) => {
	var id_admin = req.params.idad;

	//cập nhật dữ liệu vô bảng editor nếu dữ liệu thêm vào thuộc id_type = 4 (editor)
	user.all()
	.then(rows => {
		var last = rows.length - 1;
		if (rows[last].id_type == 4)
		{
			editor.single(rows[last].id)
			.then(editors => {
				if(editors[0] === undefined){
					var entity = {
					id: rows[last].id
					}
					editor.add(entity)
					.catch(err => {
						console.log(err);
					})
				}
			})
			.catch(err => {
			 	console.log(err);
			})	
		}
	})

	//load toàn bộ trang admin
	Promise.all([
		articleModel.all(),
		category.all(),
		category2.all(),
		user.allByPremium(), //danh sách premium
		user.allByType(2), //danh sách độc giả
		user.allByType(3),//danh sách phóng viên
		user.allByType(4) // danh sách biên tập viên
	])
 	.then(([articles,categorys, categorys2, users1, users2, users3, users4]) => { 		
		res.render('vwAdmin/DashBoardAdmin', {
			layout: false,
			articles,
			categorys,
			categorys2,
			users1,
			users2,
			id_type2: users2[0].id_type,
			users3,
			id_type3: users3[0].id_type,
			users4,
			id_type4: users4[0].id_type,
		})		
	})
	.catch(err => {
		console.log(err);
	})
})

//xem tất cả bài viết trên admin
router.get('/:idad/:idart',(req, res) => {
	var id_art = req.params.idart;
	articleModel.single(id_art)
	.then(rows => {
		category.findName(rows[0].id_cat)
		.then(cname => {
			res.render('vwAdmin/readArticle', {
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

//thêm bài viết viết
router.post('/:idad',(req, res) => {
	category.findId(req.body.namecat).then(rows => {
		var entity = {
		title: req.body.title,
		image: req.body.img,
		image2: req.body.img,
		abstract: req.body.abstract,
		content: req.body.content,
		date_post: req.body.datepost,
		id_cat: rows[0].id,
		status: 2 //xuất bản trực tiếp sau khi thêm (k qua editor)
		}
		articleModel.add(entity).then(
			res.redirect('/admin/1')
		).catch(err => {
			console.log(err);
		})
	}).catch(err => {
			console.log(err);
	})
})

//cập nhật bài viết 
router.post('/:idad/:idart',(req, res) => {
	var id_art = req.params.idart;
	category.findId(req.body.namecat).then(rows => {
		var entity = {
		id: id_art,
		title: req.body.title,
		image: req.body.img,
		image2: req.body.img,
		abstract: req.body.abstract,
		content: req.body.content,
		date_post: req.body.datepost,
		id_cat: rows[0].id,
		}
		articleModel.update(entity).then(
			res.redirect('/admin/1')
		).catch(err => {
			console.log(err);
		})
	}).catch(err => {
			console.log(err);
	})
})

//xóa bài viết (xóa bài viết không dính ràng buộc (vd: bài viết không có comment))
router.get('/:idad/:idart/delete', (req, res) =>{
	var id_art = req.params.idart;
	var id_ad = req.params.idad;
	articleModel.delete(id_art)
	.then(
		res.redirect('/admin/' + id_ad)
	)
	.catch(err => {
		console.log(err);
	})
})

//chuyển trang thêm hoặc sửa chuyên mục
router.get('/:idad/category/add',(req, res) => {
	res.render('vwAdmin/addedit', {
		layout: false,
	})
})
router.get('/:idad/category/:idcat/edit',(req, res) => {
	var id_cat = req.params.idcat;
	category.findName(id_cat).then(cname =>{
		res.render('vwAdmin/addedit', {
		layout: false,
		cname: cname[0].name
		})
	})
	.catch(err => {
		console.log(err);
	})
})
//thêm chuyên mục 
router.post('/:idad/category/add',(req, res) => {
	var id_ad = req.params.idad;
	var entity = {
		name: req.body.namecat
	}
	category.add(entity)
	.then(
		res.redirect('/admin/' + id_ad)
	)
	.catch(err => {
		console.log(err);
	})
})

//sửa chuyên mục 
router.post('/:idad/category/:idcat/edit',(req, res) => {
	var id_ad = req.params.idad;
	var namecat = req.body.namecat;
	var id_cat = req.params.idcat;
	var entity = {
		id: id_cat,
		name: namecat
	}
	category.update(entity)
	.then(
		res.redirect('/admin/' + id_ad)
	)
	.catch(err => {
		console.log(err);
	})
})

//xóa chuyên mục (chỉ xóa được chuyên mục không dính ràng buộc bài viết)
router.get('/:idad/category/:idcat/delete',(req, res) => {
	var id_ad = req.params.idad;
	var id_cat = req.params.idcat;
	category.delete(id_cat)
	.then(
		res.redirect('/admin/' + id_ad)
	)
	.catch(err => {
		console.log(err);
	})
})

//chuyển trang thêm hoặc sửa chuyên mục
router.get('/:idad/category2/add/:idcat',(req, res) => {
	res.render('vwAdmin/addedit', {
		layout: false,
	})
})
router.get('/:idad/category2/:idcat2/edit',(req, res) => {
	var id_cat2 = req.params.idcat2;
	category2.findName(id_cat2).then(cname =>{
		res.render('vwAdmin/addedit', {
		layout: false,
		cname: cname[0].name
		})
	})
	.catch(err => {
		console.log(err);
	})
})

//thêm chuyên mục 2
router.post('/:idad/category2/add/:idcat',(req, res) => {
	var id_ad = req.params.idad;
	var id_cat = req.params.idcat;
	var entity = {
		name: req.body.namecat,
		id_cat: id_cat
	}
	category2.add(entity)
	.then(
		res.redirect('/admin/' + id_ad)
	)
	.catch(err => {
		console.log(err);
	})
})

//sửa chuyên mục 2
router.post('/:idad/category2/:idcat2/edit',(req, res) => {
	var id_ad = req.params.idad;
	var namecat = req.body.namecat;
	var id_cat2 = req.params.idcat2;
	var entity = {
		id: id_cat2,
		name: namecat
	}
	category2.update(entity)
	.then(
		res.redirect('/admin/' + id_ad)
	)
	.catch(err => {
		console.log(err);
	})
})

//xóa chuyên mục 2 (chỉ xóa được chuyên mục không dính ràng buộc bài viết)
router.get('/:idad/category2/:idcat2/delete',(req, res) => {
	var id_ad = req.params.idad;
	var id_cat2 = req.params.idcat2;
	category2.delete(id_cat2)
	.then(
		res.redirect('/admin/' + id_ad)
	)
	.catch(err => {
		console.log(err);
	})
})


//chuyển trang thêm hoặc sửa user
router.get('/:idad/user/add/:idtype',(req, res) => {
	usertype.findName(req.params.idtype).then(rows => {
		res.render('vwAdmin/editaddUser', {
			layout: false,
			nametype: rows[0].name
		})
	})
})
router.get('/:idad/user/add/:idtype/premium',(req, res) => {
	usertype.findName(req.params.idtype).then(rows => {
		res.render('vwAdmin/editaddUser', {
			layout: false,
			nametype: rows[0].name
		})
	})
})
router.get('/:idad/user/:iduser/edit',(req, res) => {
	var id_user = req.params.iduser;
	user.single(id_user)	
	.then(users => {
		usertype.findName(users[0].id_type)
		.then(nametype => {
			res.render('vwAdmin/editaddUser', {
			layout: false,
			nametype: nametype[0].name,
			users: users[0]
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

//thêm user
router.post('/:idad/user/add/:idtype',(req, res) => {
	var id_ad = req.params.idad;
	var id_type = req.params.idtype;
	usertype.findId(req.body.nametype)
	.then(idtype => {
		var entity = {
			name: req.body.name,
			email: req.body.email,
			id_type: idtype[0].id
		}
		user.add(entity)
		.then(
			res.redirect('/admin/' + id_ad)
		)
		.catch(err => {
			console.log(err);
		})
	})
	.catch(err => {
			console.log(err);
	})
})

router.post('/:idad/user/add/:idtype/premium',(req, res) => {
	var id_ad = req.params.idad;
	usertype.findId(req.body.nametype)
	.then(idtype => {
		console.log(idtype);
		var entity = {
			name: req.body.name,
			email: req.body.email,
			id_type: idtype[0].id,
			premium: 1
		}
		user.add(entity)
		.then(
			res.redirect('/admin/' + id_ad)
		)
		.catch(err => {
			console.log(err);
		})
	})
	.catch(err => {
			console.log(err);
		})
})

//update user
router.post('/:idad/user/:iduser/edit',(req, res) => {
	var id_ad = req.params.idad;
	var id_user = req.params.iduser;
	usertype.findId(req.body.nametype)
	.then(idtype => {
		var entity = {
			id: id_user,
			name: req.body.name,
			email: req.body.email,
			id_type: idtype[0].id
		}
		if(idtype[0].id == 4) {
			var entity2 = {
				id: id_user
			}
			Promise.all([
				editor.add(entity2),
				user.update(entity)
			])
			.then(
			res.redirect('/admin/' + id_ad)
			)
			.catch(err => {
				console.log(err);
			})
		} 
		else
		{
			user.update(entity)
			.then(
				res.redirect('/admin/' + id_ad)
			)
			.catch(err => {
				console.log(err);
			})
		}
	})
	.catch(err => {
			console.log(err);
	})
})


//xóa user
router.get('/:idad/user/:iduser/delete',(req, res) => {
	var id_ad = req.params.idad;
	var id_user = req.params.iduser;
	user.single(id_user)
	.then(rows => {
		if (rows[0].id_type == 4) { //nếu xóa editor phải xóa thuộc bản editor trước
			Promise.all([
				editor.delete(id_user),
				user.delete(id_user)
			])
			.then(
				res.redirect('/admin/' + id_ad)
			)
			.catch(err => {
				console.log(err);
			})
		}
		else {			
			user.delete(id_user)
			.then(
				res.redirect('/admin/' + id_ad)
			)
			.catch(err => {
				console.log(err);
			})			
		}
	})
})

// chuyển đến phân quyền chuyên mục cho editor 
router.get('/:idad/user/:iduser/category',(req, res) => {
	var id_ad = req.params.idad;
	var id_user = req.params.iduser;
	Promise.all([
		editor.single(id_user),
		user.single(id_user)
	])
	.then(([editors, users]) => {
		category.findName(editors[0].id_cat)
		.then(cname => {
			res.render('vwAdmin/decent', {
				layout: false,
				user: users[0],
				cname: cname[0]
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

router.post('/:idad/user/:iduser/category',(req, res) => {
	var id_ad = req.params.idad;
	category.findId(req.body.cname)
	.then(categorys => {
			var entity = {
			id: req.params.iduser,
			id_cat: categorys[0].id
		}
		editor.update(entity)
		.then(
			res.redirect('/admin/' + id_ad)
		)
		.catch(err => {
			console.log(err);
		})
	})
	.catch(err => {
		console.log(err);
	})
})

module.exports = router;