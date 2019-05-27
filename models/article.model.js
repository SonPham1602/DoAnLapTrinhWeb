var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select * from article');
	},
	single: id => {
		return db.load(`select * from article where id = ${id}`)
	},
	allByCat: idcat => {
		return db.load(`select a.*, count(c.id) as num_comment from article a left join comment c 
						on id_cat = ${idcat} and c.id_art = a.id
						group by a.id`)
	},
	
	allByCat2:  idcat2 => {
		return db.load(`select a.*, count(c.id) as num_comment from article a left join comment c 
						on id_cat2 = ${idcat2} and c.id_art = a.id
						group by a.id;`)
	}
	
}