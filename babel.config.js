module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [] // plugins가 올바르게 정의되어 있는지 확인하세요
  };
};
