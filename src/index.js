const InkbirdPlatform = require('./InkbirdPlatform.js');

module.exports = (homebridge) => {
  global.homebridge = homebridge;
  homebridge.registerPlatform('homebridge-inkbird', 'Inkbird', InkbirdPlatform);
};
