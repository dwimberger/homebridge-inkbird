**Inkbird device plugin for Homebridge**
-------------------------------------

This plugin for adding Inkbird sensor devices to homebridge. It currently supports IBS-TH2 devices and uses only the realtime data from the (unfortunately not BLE conform) manufacturer advertisement (which sends the temperature as manufacturer *duh*).

You can install it using NPM like all other modules, using:

`npm install -g homebridge-inkbird`.

The plugin is a platform that has to be defined in the `config.json` file. The plugin loads the accessories from the `config.json` file and creates the accessories dynamically. A sample configuration file is like:

```JSON
{
  "bridge": {
    "name": "Test Homebridge",
    "username": "CC:22:3D:E3:CE:39",
    "port": 51826,
    "pin": "042-45-975"
  },
  "description": "This is an example configuration file with an Inkbird platform. It refers to a single Inkbird accessory of type IBSTH2.",
  "platforms": [
    {
      "platform": "Inkbird",
      "name": "Inkbird Sensor Platform for Homebridge",
      "devices": [
        {
          "name": "Bathroom Climate",
          "type": "IBSTH2",
          "deviceId": "<<Ble MAC Address>>"
        }
      ]
    }
  ]
}
```

Note that the `deviceId`  should hold the BLE Mac Address of the sensor accessory.


