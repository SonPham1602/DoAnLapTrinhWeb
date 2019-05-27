var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select * from category')
	},

	allWithDetails: () => {
		return db.load(
			`select c.id, c.name from category c 
			left join article a on c.id = a.id_cat 
			group by c.id, c.name
			`)
	},

	findName: id => {
		return db.load(
			`select name from category where id = ${id}`
			)
	}
	// allWithDetails2: () => {
	// 	return db.load(`select c.id, c.name, count(a.id) as num from category2 c 
	// 		left join article a on c.id = a.id_cat2 
	// 		group by c.id, c.name`)
	// }
	// single: id => {
	// 	return db.load(`select * from category where id = ${id}`)
	// }
}