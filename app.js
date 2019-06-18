
var express = require('express');
var exphbs  = require('express-handlebars');
var dateFormat = require('dateformat');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(express.json());	
app.use(express.urlencoded());

app.engine('hbs', exphbs({
	defaultLayout: 'index.hbs',
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
		
		format2: val => {
			return dateFormat(val, "yyyy-mm-dd");
		},

		breaklines: function(text) {
    		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
    		return text;
		}

	}	
}));
app.set('view engine', 'hbs');

app.use(require('./middlewares/locals.mdw'));
// require('./middlewares/upload')(app);

app.get('/',(req, res) => {
	res.render('home');
})


app.use('/public',express.static('public'));
app.use('/images',express.static('images'));

app.use('/user',require('./routes/user.route'));
app.use('/register',require('./routes/register.route'));
app.use('/login',require('./routes/login.route'));
app.use('/editor', require('./routes/editor.route'));
app.use('/writer', require('./routes/writer.route'));
app.use('/admin', require('./routes/admin.route'));

app.use('/categorie', require('./routes/category.route'));
app.use('/article', require('./routes/article.route'));

// app.use('/admin/categories', require('./routes/admin/category.route'));

app.listen(3000, () =>{
	console.log('Web Service is running at http://localhost:3000');	
})