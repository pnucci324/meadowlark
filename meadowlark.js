var express = require('express');
var fortune = require('./fortune');

var app = express();
var handlebars = require('express3-handlebars').create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(function(req,res, next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.get("/", function(req, res){
  res.render("home");
});

app.get('/tours/hood-river',function(req, res){
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
    res.render('tours/request-group-rate');
});

app.get('/about', function(req, res){
  res.render('about',{
	fortune: fortune.getFortune(),
	pageTestScript: '/qa/tests-about.js'
 } );
});

app.get("/travel", function(req, res){
  res.render("travel");
});

app.get("/datetime", function(req, res){
  res.render("datetime", { datetime: new Date().toString() });
});

//static page
app.use(express.static(__dirname + "/public"));

//cusom 404 page
app.use(function(req, res){
  res.type('text/plain');
  res.status(404)
 res.send('404-Not Found');
});

//cusome 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500-Server Error');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost: ' + 
  app.get('port') + '; press Ctrl-C to terminate.' );
});
