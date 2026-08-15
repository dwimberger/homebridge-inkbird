const BleScanner = require('./BleScanner.js');
const IBSTH2Accessory = require('./IBSTH2Accessory.js');

class InkbirdPlatform {

  constructor(log, config) {
    this.log = log;
    this.accessToken = config.accessToken;
    this.devices = config.devices;
    this.myAccessories = [];
    this.cache = {
      enabled: false,
      client: undefined
    };

    // Prepare cache if registered
    if (config.cache && config.cache.enabled) {
      try {
        const redis = require('@redis/client');
        this.cache.client = redis.createClient(config.cache.url);
        this.cache.enabled = true;
        this.cache.client.connect().then(() => {
          this.log(`Connected to Redis cache`);
        });
      } catch (e) {
        this.cache.enabled = false;
      }
    }

    // Boot scanner and register devices to scanner
    this.scanner = new BleScanner(this.log);
    for (let device of this.devices) {
      this.scanner.addDevice(device.deviceId);
      if (device.type === 'IBSTH2') {
        let accessory = new IBSTH2Accessory(this.log, this.scanner, device, global.homebridge, this.cache);
        this.myAccessories.push(accessory);
      }
    }
  }

  accessories(callback) {
    callback(this.myAccessories);
  }

}

module.exports = InkbirdPlatform;
