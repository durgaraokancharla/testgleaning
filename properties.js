/**
 * @name properties
 * @description properties.json loader
 * @author GLEANING
 */

var fs = require('fs')
  , logger = require('log4js').getLogger('properties');


var property_values = {};

function init(propertiesPath, callback) {
  'use strict';

  logger.info("Loading " + propertiesPath);
  //Reading properties from a properties file
  fs.readFile(propertiesPath, 'utf8', function(err, data) {
    if (err) {
      console.log('Unable to load properties file' + err);
    } else {
      property_values = JSON.parse(data);
      if (callback) {
        callback();
      }
    }
  });
}

function getValues() {
  'use strict';
  return property_values;
}

exports.init = init;
exports.getValues = getValues;