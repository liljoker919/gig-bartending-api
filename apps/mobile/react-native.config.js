// apps/mobile/react-native.config.js
module.exports = {
  project: {
    android: {
      sourceDir: './android',
      manifestPath: './android/app/src/main/AndroidManifest.xml',
      packageName: 'com.gigbartending.app',
    },
  },
  // Tells the CLI where to find node_modules in a monorepo
  root: "../../" 
};

