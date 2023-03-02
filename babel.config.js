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
            '@native-base/icons': '@native-base/icons/lib',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
