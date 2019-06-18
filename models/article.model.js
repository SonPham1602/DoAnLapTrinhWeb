var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select a.*, c.name as cname, s.name as sname from article a, category c, status s where a.id_cat = c.id and a.status = s.id');
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
		return db.load(`select * from article where status = 2 and id_cat = ${idcat} limit ${limit} offset ${offset}`)
	},
	
	countByCat: idcat => {
		return db.load(`select count(*) as total from article where status = 2 and id_cat = ${idcat}`)
	},

	pageByCat2: (idcat2, limit, offset) => {
		return db.load(`select * from article where status = 2 and id_cat2 = ${idcat2} limit ${limit} offset ${offset}`)
	},
	
	countByCat2: idcat2 => {
		return db.load(`select count(*) as total from article where status = 2 and id_cat2 = ${idcat2}`)
	},

	update: entity => {
		return db.update('article', 'id', entity)
	},

	fiveByCat: idcat => {
		return db.load(`select * from article  where status = 2 and id_cat = ${idcat} order by rand() limit 5`)
	},

	top3Week: () => {
		return db.load(`select row_number() over (order by a.view desc) as stt, a.*, c.name as cname 
						from article a, category c
						where a.id_cat = c.id and a.status = 2
						and date_post between date_sub(curdate(), interval 7 day) and curdate()
						limit 3
					`)
	},

	top12View: () => {
		return db.load(`select a.*, c.name as cname from article a, category c
						where a.id_cat = c.id and a.status = 2
						order by view desc limit 12`)
	},

	top12New: () => {
		return db.load(`select a.*, c.name as cname from article a, category c
						where a.id_cat = c.id and a.status = 2
						order by date_post desc limit 12
						`)
	},


	rand4Xh: () => {
		return db.load(`select * from article where id_cat = 1 and status = 2 order by date_post desc limit 4`)
	},

	rand4Gt: () => {
		return db.load(`select * from article where id_cat = 2 and status = 2 order by date_post desc limit 4`)
	},

	rand4Sk: () => {
		return db.load(`select * from article where id_cat = 3 and status = 2 order by date_post desc limit 4`)
	},

	rand4Kd: () => {
		return db.load(`select * from article where id_cat = 4 and status = 2 order by date_post desc limit 4`)
	},

	rand4Cn: () => {
		return db.load(`select * from article where id_cat = 5 and status = 2 order by date_post desc limit 4`)
	},

	artWriter: (id_writer, status)  => {
		return db.load(`select row_number() over (order by a.id) as stt, a.*, c.name as cname
		 from article a, category c where a.id_writer = ${id_writer} and status = ${status}
		 and a.id_cat = c.id`)
		
	},

	artEditor: (id_cat, status)  => {
		return db.load(`select row_number() over (order by a.id) as stt, a.*, c.name as cname
		 from article a, category c where a.id_cat = ${id_cat} and status = ${status}
		 and a.id_cat = c.id`)
		
	},

	add: entity => {
		return db.add('article', entity);	
	},

	delete: id => {
    	return db.delete('article', 'id', id);
  	}
}