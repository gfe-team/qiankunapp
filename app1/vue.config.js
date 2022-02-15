
const {
    name
} = require('./package.json');

module.exports = {
    filenameHashing: true,
    productionSourceMap: false,
    css: {
        extract: true,
        sourceMap: false,
        requireModuleExtension: true,
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#00cd96',
                        'link-color': '#00cd96',
                        'border-radius-base': '4px',
                    },
                    javascriptEnabled: true,
                },
            },
        }
    },

    configureWebpack: {
        output: {
            library: `app1-[name]`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`,
        },
        resolve: {
            extensions: [".js", ".vue", ".json", ".ts", ".tsx"]
        },
        module: {
            rules: []
        },
        plugins: [
            // ...plugins
        ],
        externals: {
            // 'vue': 'Vue',
            // 'vue-router': 'VueRouter',
            // 'axios': 'axios'
        },
        // 开启分离js
        optimization: {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 20000,
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name(module) {
                            // get the name. E.g. node_modules/packageName/not/this/part.js
                            // or node_modules/packageName
                            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                            // npm package names are URL-safe, but some servers don't like @ symbols
                            return `app1.${packageName.replace('@', '')}`
                        }
                    }
                }
            }
        },
        // 取消webpack警告的性能提示
        performance: {
            hints: 'warning',
            // 入口起点的最大体积
            maxEntrypointSize: 50000000,
            // 生成文件的最大体积
            maxAssetSize: 30000000,
            // 只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {

                return assetFilename.endsWith('.js');
            }
        }
    },
    devServer: {
        hot: true,
        disableHostCheck: true,
        port: 8081,
        overlay: {
            warnings: false,
            errors: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}