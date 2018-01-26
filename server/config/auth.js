//--- Passport Config ---//
//-----------------------//
var passport = require('passport');
var passportJWT = require('passport-jwt');
var users = require('../controllers/users');
var cfg = require('../../private.js');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var StrategyLocal = function(req){
	var token = null;
	if(req && req.body) {
		token = req.body.token;
	}
	return token;
};
var paramsHeader = {
	secretOrKey: cfg.jwtSecret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	passReqToCallback: true
};
var paramsLocal = {
	secretOrKey: cfg.jwtSecret,
	jwtFromRequest: StrategyLocal,
	passReqToCallback: true
};
module.exports = function(){
	var strategyHeader = new Strategy(paramsHeader, function(req,payload,done){
		done(null,{});
	});
	var strategyLocal = new Strategy(paramsLocal, function(req,payload,done){
		done(null,{});
	});
	passport.use('jwt',strategyHeader);
	passport.use('local',strategyLocal);
	return {
		initialize: function(){
			return passport.initialize();
		},
		authenticateHeader: function(){
			return passport.authenticate("jwt",cfg.jwtSession);
		},
		authenticateLocal: function(){
			return passport.authenticate("local",cfg.jwtSession);
		}
	};
};