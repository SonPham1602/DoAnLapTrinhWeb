var db = require('../utils/db');

module.exports = {

	allByArt: idart => {
		return db.load(`select * from comment where id_art = ${idart}`)
	},
	
}