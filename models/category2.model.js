var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load(
			`select * from category2`)
	},
	findName: id => {
		return db.load(
			`select name from category2 where id = ${id}`
			)
	}
}