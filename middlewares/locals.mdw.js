var categoryModel = require('../models/category.model');
var category2Model = require('../models/category2.model');
var articleModel = require('../models/article.model')
var dateFormat = require('dateformat');

module.exports = (req, res, next) => {
	res.locals.datenow = dateFormat(new Date(),"dddd, dd mm yyyy");
	res.locals.datenowSql = dateFormat(new Date(),"yyyy-mm-dd");	
	// res.locals.id_account = 1;
	Promise.all([
		categoryModel.all(),
		category2Model.all(),
		articleModel.top3Week(),
		articleModel.top12View(),
		articleModel.top12New(),
		articleModel.rand4Xh(),
		articleModel.rand4Gt(),
		articleModel.rand4Sk(),
		articleModel.rand4Kd(),
		articleModel.rand4Cn(),
	])
	.then(([rows, rows2, top3, top12v, top12n, r4xh, r4gt, r4sk, r4kd, r4cn]) => {
		res.locals.lcCategories = rows;
		res.locals.lcCategories2 = rows2;
		res.locals.top3 = top3;
		
		var top4v1 = [];
		var top4v2 = [];
		var top4v3 = [];
		if(top12v.length > 0) {
			for(var i = 0; i < top12v.length - 8; i++){
				top4v1.push(top12v[i]);
			}	
			for(var i = 4; i < top12v.length - 4; i++){
				top4v2.push(top12v[i]);
			}
			for(var i = 8; i < top12v.length; i++){
				top4v3.push(top12v[i]);
			}
		}

		var top4n1 = [];
		var top4n2 = [];
		var top4n3 = [];
		if(top12n.length > 0) {
			for(var i = 0; i < top12n.length - 8; i++){
				top4n1.push(top12n[i]);
			}	
			for(var i = 4; i < top12n.length - 4; i++){
				top4n2.push(top12n[i]);
			}
			for(var i = 8; i < top12n.length; i++){
				top4n3.push(top12n[i]);
			}
		}

		res.locals.top4v1 = top4v1;
		res.locals.top4v2 = top4v2;
		res.locals.top4v3 = top4v3;

		res.locals.top4n1 = top4n1;
		res.locals.top4n2 = top4n2;
		res.locals.top4n3 = top4n3;

		res.locals.r4xh = r4xh;
		res.locals.r4gt = r4gt;
		res.locals.r4sk = r4sk;
		res.locals.r4kd = r4kd;
		res.locals.r4cn = r4cn;
		next();
	})
}