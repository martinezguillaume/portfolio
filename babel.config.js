module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '^~/(.+)': './\\1',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
