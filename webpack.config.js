var webpack = require('webpack');
module.exports ={
    entry: {
        common:['react', 'react-dom'],
        index: "./app/index"
    },
    module:{
        rules: [{
            test: /\.js|jsx$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react']
              }
            }
        }]
    },
    plugins:[new webpack.optimize.SplitChunksPlugin({
        chunks: "initial",
        minSize: 20000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: true,
        cacheGroups: {
            common: {
                name: "common",
                chunks: "initial",
                minChunks: 2
            }
        }
      })],
    output: {
        path: __dirname + '/static/dist/',
        filename: '[name].bundle.js'
    }
}