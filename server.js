const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n');
	next();
});

app.use((req, res, next) => {
	res.render('maintnance.hbs');
});

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('toUpperCase', (text) => {
	return text.toUpperCase()
});

app.get('/', (req, res) => {	
	res.render('home.hbs', {
		pageTitle: 'Home page',
		welcomeMessage: 'Welcome to home page'
	});
});


app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About page'
	});
});

app.get('/bad', (req, res) => {	
	res.send({
		errorMessage: 'Unable to see this page'	
	});
});


app.listen(3000, () => {
	console.log('Server is up on port 3000');
});