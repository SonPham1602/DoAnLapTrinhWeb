var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select * from category')
	},

	findName: id => {
		return db.load(
			`select name from category where id = ${id}`
			)
	}
}