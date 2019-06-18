var db = require('../utils/db');
module.exports = {
	findName: id => {
		return db.load(`select * from usertype where id = ${id}`)
	},
	findId: name => {
		return db.load(`select * from usertype where name = '${name}'`)
	}
}