/**
 * gleaning globalconfigs are here
 *
 * @module Utils
 * @author Raja Pattanayak
 */

var resLib = require('./services/server_response_lib');
var jwt    = require('jsonwebtoken');

var setResponseHeader = function(req, res, next) {
	// Set response header first
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Content-Length, Accept, Authorization, clientid, role, authToken, J290EeGRFyIYRdXES7outLUbZKr, Source, service-key, app-key, fpToken");
	res.header("Access-Control-Expose-Headers", "Token");
	// Move to the next route
	next();
}

var interceptOptionsMethod = function(req, res, next) {
  if ('OPTIONS' === req.method) {
  	// Send response back if OPTION header present
    res.send(200);
  }
  else {
  	// Go to next route
    next();
  }
}

var serviceKeyChecker = function (req, res, next) {
  var serviceKey =  req.headers['service-key'];
  if (serviceKey && serviceKey.length
    && GLOBAL.SERVICE_KEY === serviceKey)
  {
    console.log("Service key matches: " + serviceKey);
    next();
  } else {
    resLib.serverError(res, 401, "No service key provided in the request");
  }
}

var jwtTokenVerify = function(req, res, next) {
  var token = null;
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  }
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, CONFIG.secret, function(err, decoded) {      
      if (err) {
        return resLib.serverError(res, 401, "Failed to authenticate token.");
      } else {
        // if everything is good, save to request for use in other route
        logger.debug("decoded token: " + JSON.stringify(decoded));
        req.decoded = decoded;
        //console.log(req);
        next();
      }
    });
  } else {
    return resLib.serverError(res, 401, "No token provided.");
  }
}

var unauthorisedError = function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    resLib.serverError(res, 401, "Invalid Token");
  }
}

module.exports = {
	setResponseHeader: setResponseHeader,
	interceptOptionsMethod: interceptOptionsMethod,
	serviceKeyChecker: serviceKeyChecker,
	jwtTokenVerify: jwtTokenVerify,
	unauthorisedError: unauthorisedError
}

