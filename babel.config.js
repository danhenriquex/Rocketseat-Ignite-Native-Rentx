module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],

    plugins: ['react-native-reanimated/plugin', ["@babel/plugin-proposal-decorators", { "legacy": true }],
      ['module-resolver',
        {
          alias: {
            routes: './src/routes',
            components: './src/components',
            assets: './src/assets',
            modules: './src/modules',
            services: './src/services',
            utils: './src/utils',
            lib: './src/lib',
            types: './src/types',
            screens: './src/screens',
            styles: './src/styles',
            global: './src/global',
            contexts: './src/contexts',
            hooks: './src/hooks',
            database: './src/database',

          },
        },
      ],
    ]
  };
};
