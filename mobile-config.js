/* globals App */
/* eslint-disable quote-props */

App.info({
  name: 'MeteorNote',
  description: 'A simple todo list and note-taking app built in Meteor.',
  author: 'windmaple',
  email: 'windmaple@gmail.com',
  website: '',
  version: '0.1',
});

App.icons({
  // iOS
  'iphone_2x': 'resources/icons/icon-60x60@2x.png',
  'iphone_3x': 'resources/icons/icon-60x60@3x.png',
  'ipad': 'resources/icons/icon-76x76.png',
  'ipad_2x': 'resources/icons/icon-76x76@2x.png',

  // Android
  'android_mdpi': 'resources/icons/icon-48x48.png',
  'android_hdpi': 'resources/icons/icon-72x72.png',
  'android_xhdpi': 'resources/icons/icon-96x96.png',
});

App.launchScreens({
  // iOS
  'iphone_2x': 'resources/splash/ios/Default@2x~iphone.png',

  'iphone5': 'resources/splash/ios/Default-568h@2x~iphone.png',
  'iphone6': 'resources/splash/ios/Default-667h.png',
  'iphone6p_portrait': 'resources/splash/ios/Default-736h.png',
  'iphone6p_landscape': 'resources/splash/ios/Default-Landscape-736h.png',

  'ipad_portrait': 'resources/splash/ios/Default-Portrait~ipad.png',
  'ipad_portrait_2x': 'resources/splash/ios/Default-Portrait@2x~ipad.png',
  'ipad_landscape': 'resources/splash/ios/Default-Landscape~ipad.png',
  'ipad_landscape_2x': 'resources/splash/ios/Default-Landscape@2x~ipad.png',

  // Android
  'android_mdpi_portrait': 'resources/splash/android/drawable-port-mdpi/screen.png',
  'android_mdpi_landscape': 'resources/splash/android/drawable-land-mdpi/screen.png',
  'android_hdpi_portrait': 'resources/splash/android/drawable-port-hdpi/screen.png',
  'android_hdpi_landscape': 'resources/splash/android/drawable-land-hdpi/screen.png',
  'android_xhdpi_portrait': 'resources/splash/android/drawable-port-xhdpi/screen.png',
  'android_xhdpi_landscape': 'resources/splash/android/drawable-land-xhdpi/screen.png',
});

App.setPreference('StatusBarOverlaysWebView', 'false');
App.setPreference('StatusBarBackgroundColor', '#000000');
