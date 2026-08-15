const BleScanner = require('./BleScanner.js');
const IBSTH2Accessory = require('./IBSTH2Accessory.js');
const redis = require('@redis/client');

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
      this.log(`Preparing REDIS cache`);
      try {
        this.cache.client = redis.createClient(
            {
              url: config.cache.url
            });
        this.cache.enabled = true;
        this.cache.client.connect()
            .then(() => {
              this.log(`Connected to Redis cache`);
            })
            .catch((error) => {
              this.log(`${error.message} occurred while connecting to REDIS`);
            });
      } catch (e) {
        this.log(`${e.message} occurred while preparing REDIS cache`);
        this.cache.enabled = false;
      }
    } else {
      this.log(`REDIS cache not configured or disabled`);
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
