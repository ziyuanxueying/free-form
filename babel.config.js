module.exports = {
  presets:
    process.env.NODE_ENV === 'test'
      ? [['@babel/preset-env', { targets: { node: 'current' } }], [
        '@babel/preset-typescript', {
          allExtensions: true,
          isTSX: true
        }
      ]]
      : [[ '@babel/preset-env', { targets: '>2%, not IE 11' } ]],
  plugins: ['@vue/babel-plugin-jsx']
}