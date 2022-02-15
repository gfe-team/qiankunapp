const path = require('path');
const resolve = dir => path.resolve(__dirname, dir);
const CracoLessPlugin = require("craco-less");
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackBar = require('webpackbar');

module.exports = {
    // webpack: {
    //     alias: {
    //         '@': path.resolve('./src')
    //     },
    //     plugins: [
    //         // 查看打包的进度
    //         new SimpleProgressWebpackPlugin()
    //     ]
    // },
    webpack: {
        alias: {
            '@': path.resolve('./src')
        },
        configure: (webpackConfig, {
            env,
            paths
        }) => {
            // paths.appPath='public'
            paths.appBuild = 'dist';

            webpackConfig.output = {
                ...webpackConfig.output,
                // // ...{
                // //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
                // //   chunkFilename: 'static/js/[name].js'
                // // },
                library: 'app4',
                libraryTarget: 'umd',
                path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
                publicPath: 'http://localhost:8084/'
            };

            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                // // 查看打包的进度
                // new SimpleProgressWebpackPlugin(),
                // // webpack构建进度条
                new WebpackBar({
                    profile: true
                }),
            ];

            return webpackConfig
        }
    },
    plugins: [{
        plugin: CracoLessPlugin,
        // 自定义主题配置
        options: {
            lessLoaderOptions: {
                lessOptions: {
                    modifyVars: {
                        '@primary-color': '#1DA57A'
                    },
                    javascriptEnabled: true
                }
            }
        }
    }],
    //抽离公用模块
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                },
                vendor: {
                    test: /node_modules/,
                    chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    devServer: {
        port: 8084,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/api': {
                target: 'https://placeholder.com/',
                changeOrigin: true,
                secure: false,
                xfwd: false,
            }
        }
    }
}