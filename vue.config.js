const glob = require('glob')
const os = require(`os`)
const webpack = require(`webpack`)
const CompressionWebpackPlugin = require('compression-webpack-plugin');

function creatEntry() {
    const entryObj = {}
    glob.sync('./src/*/index.html').forEach(val => {
        const url = val.split(os.type() == `Linux` ? '/' : '\\')[1]
        console.log(url)
        entryObj[url] = {
            entry: `src/${url}/main.js`,
            template: `src/${url}/index.html`,
            filename: `${url}.html`
        }

    })
    return entryObj
}

module.exports = {
    pages: creatEntry(),
    publicPath: './',
    transpileDependencies: true,
    runtimeCompiler: true
}
