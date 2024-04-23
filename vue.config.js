import { defineConfig } from '@vue/cli-service';
import AutoImport from 'unplugin-auto-import/webpack';
import Components from 'unplugin-vue-components/webpack';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import { glob } from 'glob';
import os from 'os';
function creatEntry() {
    const entryObj = {};
    glob.sync('./src/*/index.html').forEach(val => {
        const url = val.split(os.type() == `Linux` ? '/' : '\\')[1];
        if (url == `index`) {
            entryObj[url] = {
                entry: `src/${url}/main.ts`,
                template: `src/${url}/index.html`,
                filename: `index.html`
            };
        }
        else {
            entryObj[url] = {
                entry: `src/${url}/main.ts`,
                template: `src/${url}/index.html`,
                filename: `${url}/index.html`
            };

        }

    });
    return entryObj;
}
export default defineConfig({
    pages: creatEntry(),
    publicPath: '/',
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
        },
        plugins: [
            AutoImport({
                resolvers: [TDesignResolver({
                    library: 'vue-next'
                })],
            }),
            Components({
                resolvers: [TDesignResolver({
                    library: 'vue-next'
                })],
            }),

        ]
    },
    parallel: false
}
);
