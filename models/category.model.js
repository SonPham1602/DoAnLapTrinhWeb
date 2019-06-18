var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select * from category')
	},

	findName: id => {
		return db.load(
			`select name from category where id = ${id}`
			)
	},
	findId: name => {
		return db.load(
			`select id from category where name = '${name}'`
			)
	},
	delete: id => {
    	return db.delete('category', 'id', id);
  	},
  	add: entity => {
		return db.add('category', entity);	
	},
	update: entity => {
		return db.update('category', 'id', entity)
	}
}