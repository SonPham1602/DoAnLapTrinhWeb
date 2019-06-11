

var express = require('express');
var exphbs  = require('express-handlebars');
var dateFormat = require('dateformat');
var app = express();

app.engine('hbs', exphbs({
	defaultLayout: 'index.hbs',
	// layoutsDir: 'views/_layouts'2
	helpers: {
		if_equal: function (a, b, opts) {
			if(a == b) { 
				return opts.fn(this)
			}
			else {
				return opts.inverse(this)	
			}
		},

		format: val => {
			return dateFormat(val, "dd/mm/yyyy");
		},

		breaklines: function(text) {
    		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    		return text;
		}

	}	
}));
app.set('view engine', 'hbs');

app.use(require('./middlewares/locals.mdw'));

app.get('/',(req, res) => {
	res.render('home');
})

app.use('/public',express.static('public'));
app.use('/images',express.static('images'));

app.use('/categorie', require('./routes/category.route'));
app.use('/article', require('./routes/article.route'));

// app.use('/admin/categories', require('./routes/admin/category.route'));

app.listen(3000, () =>{
	console.log('Web Service is running at http://localhost:3000');	
})