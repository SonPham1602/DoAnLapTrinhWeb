var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select * from article');
	},
	single: id => {
		return db.load(`select * from article where id = ${id}`)
	},
	allByCat: idcat => {
		return db.load(`select * from article where id_cat = ${idcat}`)
	},
		
	allByCat2:  idcat2 => {	
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
	},

	update: entity => {
		return db.update('article', 'id', entity)
	},

	fiveByCat: idcat => {
		return db.load(`select * from article  where id_cat = ${idcat} order by rand() limit 5`)
	},

	top3Week: () => {
		return db.load(`select row_number() over (order by a.view desc) as stt, a.*, c.name as cname 
						from article a, category c
						where a.id_cat = c.id 
						and date_post between date_sub(curdate(), interval 7 day) and curdate()
						limit 3
					`)
	},

	top10View: () => {
		return db.load(`select a.*, c.name as cname from article a, category c
						where a.id_cat = c.id
						order by view desc limit 10`)
	},

	top10New: () => {
		return db.load(`select a.*, c.name as cname from article a, category c
						where a.id_cat = c.id
						order by date_post desc limit 10
						`)
	},


	rand4Xh: () => {
		return db.load(`select * from article where id_cat = 1 order by date_post desc limit 4`)
	},

	rand4Gt: () => {
		return db.load(`select * from article where id_cat = 2 order by date_post desc limit 4`)
	},

	rand4Sk: () => {
		return db.load(`select * from article where id_cat = 3 order by date_post desc limit 4`)
	},

	rand4Kd: () => {
		return db.load(`select * from article where id_cat = 4 order by date_post desc limit 4`)
	},

	rand4Cn: () => {
		return db.load(`select * from article where id_cat = 5 order by date_post desc limit 4`)
	},

}