//--- Passport Config ---//
//-----------------------//
var passport = require('passport');
var passportJWT = require('passport-jwt');
var users = require('../controllers/users');
var cfg = require('../../private.js');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
	secretOrKey: cfg.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	passReqToCallback: true
};

module.exports = function(){
	var strategy = new Strategy(params, function(req,payload,done){
		users.registerUser(req,payload,done);
	});
	passport.use('jwt',strategy);
	return {
		initialize: function(){
			return passport.initialize();
		},
		authenticate: function(){
			console.log('we checked');
			return passport.authenticate("jwt",cfg.jwtSession);
		}
	}
};