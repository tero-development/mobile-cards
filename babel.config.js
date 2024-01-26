module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
          [
            "module-resolver",
            {
              extensions: [".tsx", ".ts", ".js", ".json"],
            }
          ],
          ["module:react-native-dotenv", {
            "envName": "APP_ENV",
            "moduleName": "@env",
            "path": ".env",
            "blocklist": null,
            "allowlist": null,
            "blacklist": null, // DEPRECATED
            "whitelist": null, // DEPRECATED
            "safe": false,
            "allowUndefined": true,
            "verbose": false
          }],
          '@babel/plugin-proposal-export-namespace-from',
          'react-native-reanimated/plugin'
    ],
  };
};
