// https://github.com/michael-ciniawsky/postcss-load-config
let config = require('./config')

let options = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    'postcss-pxtorem': {
      rootValue: 32,
      unitPrecision: 5,
      propList: ['*'],
      // selectorBlackList: [/^p/],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 6
    }
  }
}

if (config.platform === 'pc') {
  options = {
    "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      // to edit target browsers: use "browserslist" field in package.json
      "autoprefixer": {}
    }
  }
}
module.exports = options
