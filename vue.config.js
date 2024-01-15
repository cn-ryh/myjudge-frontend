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
    runtimeCompiler: true,
    configureWebpack: {
        plugins: [
            new CompressionWebpackPlugin({
                algorithm: 'gzip', // 使用gzip压缩
                test: /\.js$|\.css$/, // 匹配文件名
                minRatio: 1, // 压缩率小于1才会压缩
                threshold: 1024, // 对超过10k的数据压缩
                deleteOriginalAssets: false, // 是否删除未压缩的源文件，谨慎设置，如果希望提供非gzip的资源，可不设置或者设置为false（比如删除打包后的gz后还可以加载到原始资源文件）
            }),
        ]
    }
}
