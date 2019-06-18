var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load(
			'select * from category2')
	},
	findName: id => {
		return db.load(
			`select name from category2 where id = ${id}`
			)
	},

	allByCat1: idcat => {
		return db.load(`select * from category2 where id_cat = ${idcat}`)
	},
	delete: id => {
    	return db.delete('category2', 'id', id);
  	},
  	add: entity => {
		return db.add('category2', entity);	
	},
	update: entity => {
		return db.update('category2', 'id', entity)
	}
}
