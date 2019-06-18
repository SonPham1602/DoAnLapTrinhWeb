var db = require('../utils/db');

module.exports = {
	all: () => {
		return db.load('select * from account')
	},
	find: iduser => {
		return db.load(`select a.*, u.name, u.email from account a, user u where a.id = u.id_account and u.id = ${iduser}`)
	},
	update: entity => {
		return db.update('account', 'id', entity)
	}
}