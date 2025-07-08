const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Disable unstable_enablePackageExports to work around issues with Node standard library modules
config.resolver.unstable_enablePackageExports = false;

// Optionally, if you want to redirect to the browser version for some libraries (e.g., ws)
config.resolver.resolveRequest = function packageExportsResolver(context, moduleImport, platform) {
  if (moduleImport === 'ws' || moduleImport.startsWith('ws/')) {
    return context.resolveRequest(
      {
        ...context,
        unstable_conditionNames: ['browser'],
      },
      moduleImport,
      platform
    );
  }
  return context.resolveRequest(context, moduleImport, platform);
};

module.exports = withNativeWind(config, { input: './global.css' });