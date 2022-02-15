module.exports = {
    webpack: (config) => {
        config.output.library = 'app5';
        config.output.libraryTarget = 'umd';
        config.output.publicPath = 'http://localhost:8085/';
        return config;
    },
    devServer: (configFunction) => {
        return function (proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            config.headers = {
                "Access-Control-Allow-Origin": '*'
            }
            return config
        }
    }
}