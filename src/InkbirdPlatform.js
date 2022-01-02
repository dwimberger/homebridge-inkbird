const BleScanner = require('./BleScanner.js');
const IBSTH2Accessory = require('./IBSTH2Accessory.js');

class InkbirdPlatform {

  constructor(log, config) {
    this.log = log;
    this.accessToken = config.accessToken;
    this.devices = config.devices;
    this.myAccessories = [];

    // Boot scanner and register devices to scanner
    this.scanner = new BleScanner(this.log);
    for (let device of this.devices) {
      this.scanner.addDevice(device.deviceId);
      if (device.type === 'IBSTH2') {
        let accessory = new IBSTH2Accessory(this.log, this.scanner, device, global.homebridge);
        this.myAccessories.push(accessory);
      }
    }
  }

  accessories(callback) {
    callback(this.myAccessories);
  }

}

module.exports = InkbirdPlatform;
