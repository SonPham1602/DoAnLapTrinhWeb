var db = require('../utils/db');

module.exports = {
	// allByCat: idcat => {
	// 	return db.load(`select distinct c2.name from category c, category2 c2 where c2.id_cat = ${idcat}`)
	// }
	allWithDetails: () => {
		return db.load(
			`select c.id, c.id_cat, c.name from category2 c 
			left join article a on c.id = a.id_cat2
			group by c.id, c.id_cat, c.name
			`)
	},
	findName: id => {
		return db.load(
			`select name from category2 where id = ${id}`
			)
	}
}