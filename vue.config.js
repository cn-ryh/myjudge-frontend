const { defineConfig } = require('@vue/cli-service')
const glob = require('glob')
const os = require(`os`)
function creatEntry() {
  const entryObj = {}
  glob.sync('./src/*/index.html').forEach(val => {
    const url = val.split(os.type() == `Linux` ? '/' : '\\')[1]
    console.log(url)
    entryObj[url] = {
      entry: `src/${url}/main.ts`,
      template: `src/${url}/index.html`,
      filename: `${url}.html`
    }

  })
  return entryObj
}
module.exports = defineConfig({
  pages: creatEntry(),
  publicPath: './',
  transpileDependencies: true,
  runtimeCompiler: true,
  configureWebpack: {
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
          }
        }
      ]
    }
  },
  parallel: false
}
)
