var categoryModel = require('../models/category.model');
var category2Model = require('../models/category2.model');
var articleModel = require('../models/article.model')
var dateFormat = require('dateformat');

module.exports = (req, res, next) => {
	res.locals.datenow = dateFormat(new Date(),"dddd, dd mm yyyy");
	res.locals.datenowSql = dateFormat(new Date(),"yyyy-mm-dd");
	res.locals.id_account = 1;
	Promise.all([
		categoryModel.all(),
		category2Model.all(),
		articleModel.top3Week(),
		articleModel.top10View(),
		articleModel.top10New(),
		articleModel.rand4Xh(),
		articleModel.rand4Gt(),
		articleModel.rand4Sk(),
		articleModel.rand4Kd(),
		articleModel.rand4Cn(),
	])
	.then(([rows, rows2, top3, top10v, top10n, r4xh, r4gt, r4sk, r4kd, r4cn]) => {
		res.locals.lcCategories = rows;
		res.locals.lcCategories2 = rows2;
		res.locals.top3 = top3;
		res.locals.top10v = top10v;
		res.locals.top10n = top10n;
		res.locals.r4xh = r4xh;
		res.locals.r4gt = r4gt;
		res.locals.r4sk = r4sk;
		res.locals.r4kd = r4kd;
		res.locals.r4cn = r4cn;
		next();
	})
}