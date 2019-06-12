var categoryModel = require('../models/category.model');
var category2Model = require('../models/category2.model');
var dateFormat = require('dateformat');

module.exports = (req, res, next) => {
	res.locals.datenow = dateFormat(new Date(),"dddd, dd mm yyyy");
	res.locals.datenowSql = dateFormat(new Date(),"yyyy-mm-dd")
	category2Model.allWithDetails().then(rows2 => {
		res.locals.lcCategories2 = rows2;
	})
	categoryModel.allWithDetails().then(rows => {
		res.locals.lcCategories = rows;
		next();
	})
}