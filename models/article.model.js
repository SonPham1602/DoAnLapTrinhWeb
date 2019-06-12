var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select * from article');
	},
	single: id => {
		return db.load(`select * from article where id = ${id}`)
	},
	allByCat: idcat => {
		// return db.load(`select a.*, count(c.id) as num_comment from article a left join comment c 
		// 				on id_cat = ${idcat} and c.id_art = a.id
		// 				group by a.id`)
		return db.load(`select * from article where id_cat = ${idcat}`)
	},
		
	allByCat2:  idcat2 => {
		// return db.load(`select a.*, count(c.id) as num_comment from article a left join comment c 
		// 				on id_cat2 = ${idcat2} and c.id_art = a.id
		// 				group by a.id;`)
		return db.load(`select * from article where id_cat2 = ${idcat2}`)
	},

	pageByCat: (idcat, limit, offset) => {
		return db.load(`select * from article where id_cat = ${idcat} limit ${limit} offset ${offset}`)
	},
	
	countByCat: idcat => {
		return db.load(`select count(*) as total from article where id_cat = ${idcat}`)
	},

	pageByCat2: (idcat2, limit, offset) => {
		return db.load(`select * from article where id_cat2 = ${idcat2} limit ${limit} offset ${offset}`)
	},
	
	countByCat2: idcat2 => {
		return db.load(`select count(*) as total from article where id_cat2 = ${idcat2}`)
	}


}