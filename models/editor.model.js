var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select * from editor')
	},
	single: id => {
		return db.load(`select * from editor where id = ${id}`)
	},
	update: entity => {
		return db.update('editor', 'id', entity)
	},
	add: entity => {
		return db.add('editor', entity);	
	},
	delete: id => {
    	return db.delete('editor', 'id', id);
  	}
}