// var express = require('express');
// var router = express.Router();
// router.get('/register',(req,res,next)=>{
// 	res=render('vmLogin/register');
// })
// router.post('/register',(req,res,next)=>{
// 	res.render('vmLogin/register');
// })
// module.exports = router;

var express = require('express');
var passport = require('passport'); //phải bật cmd lên npm install passport này
//const userModel = require('../../models/user.model'); lên google sear ch cài lại này là đc
var router = express.Router();

router.get('/', (req, res) => {
 	res.render('vwLogin/login', {layout: false});
});

// router.post('/', (req, res, next) => {
//     passport.authenticate('local', (err, user, info) => {
//         if (err)
//             return next(err);

//         if (!user) {
//             return res.render('vmLogin/login', {
//                 err_message: info.message
//             })
//         }

//         req.logIn(user, err => {
//             if (err)
//                 return next(err);

//             return res.redirect('/');
//         });
//     })(req, res, next);
// });
//bat cmd nhu nao k to hop phim dc a

module.exports = router;