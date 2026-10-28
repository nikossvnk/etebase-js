// Only used by Jest, the build uses tsc and ts-loader
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: "current" },
    }],
    '@babel/preset-typescript',
  ],
};
