cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-device.device",
    "file": "plugins/cordova-plugin-device/www/device.js",
    "pluginId": "cordova-plugin-device",
    "clobbers": [
      "device"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.Coordinates",
    "file": "plugins/cordova-plugin-geolocation/www/Coordinates.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "Coordinates"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.PositionError",
    "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "PositionError"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.Position",
    "file": "plugins/cordova-plugin-geolocation/www/Position.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "Position"
    ]
  },
  {
    "id": "cordova-plugin-geolocation.geolocation",
    "file": "plugins/cordova-plugin-geolocation/www/geolocation.js",
    "pluginId": "cordova-plugin-geolocation",
    "clobbers": [
      "navigator.geolocation"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-statusbar.statusbar",
    "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
    "pluginId": "cordova-plugin-statusbar",
    "clobbers": [
      "window.StatusBar"
    ]
  },
  {
    "id": "jpush-phonegap-plugin.JPushPlugin",
    "file": "plugins/jpush-phonegap-plugin/www/JPushPlugin.js",
    "pluginId": "jpush-phonegap-plugin",
    "clobbers": [
      "JPush"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "com.spout.phonegap.plugins.baidulocation": "0.1.0",
  "cordova-plugin-compat": "1.1.0",
  "cordova-plugin-crosswalk-webview": "2.1.0",
  "cordova-plugin-device": "1.1.2",
  "cordova-plugin-geolocation": "2.4.0",
  "cordova-plugin-jcore": "1.2.0",
  "cordova-plugin-splashscreen": "3.2.2",
  "cordova-plugin-statusbar": "2.2.0",
  "cordova-plugin-whitelist": "1.2.2",
  "jpush-phonegap-plugin": "3.2.13"
};
// BOTTOM OF METADATA
});