var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');
var port = process.env.PORT || 3000;
var app = express();
var auth = require('./server/config/auth')();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(auth.initialize());

var router = require('./server/config/routes');
router(app);

if(app.get('env') === "development"){
	var compiler = webpack(config);

	app.use(require('webpack-dev-middleware')(compiler, {
	  noInfo: true,
	  publicPath: config.output.publicPath
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	app.use(express.static(__dirname + '/client'));

	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, '/client/index.html'));
	});
} else {
	app.use(express.static(__dirname + '/dist/app'));

	app.get('*', function(req, res) {
	  res.sendFile(path.join(__dirname, '/dist/app/index.html'));
	});
}

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  
  console.log('Listening at localhost:'+port+'!!!!');
});