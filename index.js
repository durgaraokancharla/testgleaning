/**
 * The starting point of the gleaning node server.
 *
 * @author Santosh Mandal
 */

GLOBAL.APP_NAME    = process.env.APP_NAME;

var express          = require('express'),
    expressJWT       = require('express-jwt'),
    jwt              = require('jsonwebtoken'),
    RoutesRegistry   = require('./routesRegistry'),
    customMiddleWire = require('./customMiddleWire'),
    properties       = require('./properties.js'),
    log4js           = require('log4js'),
    path             = require('path'),
    fs               = require('fs'),
    bodyParser       = require('body-parser'),
    multiparty       = require('connect-multiparty'),
    db               = require('./db'),
    endpoints        = require('./utils/endpoints'),
    globalconfigs    = require('./utils/globalconfigs'),
    resLib           = require('./services/server_response_lib');

/**
 * Configure log4js-node
 */
log4js.replaceConsole();
log4js.configure({
  appenders: [
    {type: 'console'}
  ]
});
var logger = log4js.getLogger('app');



properties.init(process.cwd() + '/properties.json', function () {
  "use strict";

  GLOBAL.CONFIG = properties.getValues();
  //set global configs
  globalconfigs(CONFIG);

  /**
   * Configure express app
   */

  // Create express app
  var app = express();

  // Set the port
  var port       = Number(process.env.PORT || CONFIG.appPort);
  CONFIG.appPort = port;
  
  // 1) Set response header
  app.use(customMiddleWire.setResponseHeader);

  // 2) Intercept Option Method
  app.use(customMiddleWire.interceptOptionsMethod);

  // 3) Static Images
  app.use('/images', express.static(path.join(__dirname, '/public/images')));
  
  // 4) Service Key Check
  app.use(customMiddleWire.serviceKeyChecker);
  
  // 5) JWT Token validation for protected path
  app.use(endpoints.PROTECTED_PATH,
    expressJWT({secret: CONFIG.secret}),
    customMiddleWire.jwtTokenVerify
  );

  // 6) Unauthorised error
  app.use(customMiddleWire.unauthorisedError);

  // 7) Unprotected Path
  //Revisit the secret key. It may be GUID or need to be combination of client id etc.
  app.use(expressJWT({ secret: CONFIG.secret }).unless({ path: endpoints.PUBLIC_PATH}));

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.use(multiparty({maxFieldsSize: '200mb'}));
  
  //Initialize Registry
  var registery = new RoutesRegistry();
  registery.init(app);

  //Welcome
  app.get('/', function (req, res) {
    res.send("Response from server : " + port + '/api');  
  });
  //API Version
  app.get('/api/v1/version', function (req, res) {
    res.json({serverVersion: GLOBAL.CONFIG.appVersion});
  });
  
  //Start the app if db is avilable
  db.connect(GLOBAL.DB_MYSQL_TEST, function(err) {
    if (err) {
      console.log('Unable to connect to MySQL.');
      process.exit(1);
    } else {
      app.listen(port, function() {
        console.log('Listening on port ' + port);
      });
    }
  });
  
});
