var express = require('express');
var passport = require('passport'); //phải bật cmd lên npm install passport này
//const userModel = require('../../models/user.model'); lên google sear ch cài lại này là đc
var router = express.Router();

router.get('/', (req, res) => {
 	res.render('vwUser/user', {layout: false});
});

module.exports = router;