var express = require('express');
var user = require('../models/user.model');
var account = require('../models/account.model');

var router = express.Router();

router.get('/:iduser', (req, res) => {
	var id_user = req.params.iduser;
	account.find(id_user)
	.then(accounts =>{
		res.render('vwUser/user', {
			layout: false,
			account: accounts[0]
		})
	})
	.catch(err => {
		console.log(err);
	})	
});

router.post('/:iduser', (req, res) => {
	var id_user = req.params.iduser;
	if(req.body.newpass == req.body.repeat) {
		var entity = {
			id: id_user,
			name: req.body.name,
			email: req.body.email
		}
		account.find(id_user)
		.then(accounts =>{
			var entity2 = {
				id: accounts[0].id,
				password: req.body.newpass
			}
			Promise.all([
				user.update(entity),
				account.update(entity2)
			])
			.then(
				res.redirect('/user/' + id_user)
			)
			.catch(err => {
				console.log(err);
			})
		})
		.catch(err => {
			console.log(err);
		})
	}
	else {
		console.log('Repear password not true !!!')
	}
});

module.exports = router;