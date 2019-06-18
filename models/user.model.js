var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select * from user')
	},
	single: id => {
		return db.load(`select * from user where id = ${id}`)
	},
	allByType: id => {
		return db.load(`select * from user where id_type = ${id}`)
	},
	allByPremium: () => {
		return db.load('select * from user where premium = 1')
	},
	delete: id => {
    	return db.delete('user', 'id', id);
  	},
  	add: entity => {
		return db.add('user', entity);	
	},
	update: entity => {
		return db.update('user', 'id', entity)
	}
}