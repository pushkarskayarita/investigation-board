const autoprefixer = require('autoprefixer')
const nested = require('postcss-nested')

module.exports = {
    plugins: [autoprefixer, nested],
}
