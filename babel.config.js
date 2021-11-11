module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin', ['module-resolver',
      {
        alias: {
          routes: './src/routes',
          components: './src/components',
          assets: './src/assets',
          modules: './src/modules',
          services: './src/services',
          lib: './src/lib',
          types: './src/types',
          screens: './src/screens',
          styles: './src/styles',
          global: './src/global',
          contexts: './src/contexts',
        },
      },
    ],
    ]
  };
};
