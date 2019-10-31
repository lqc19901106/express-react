const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports ={
    mode:'development',
    devtool: 'source-map',
    entry: {
        common:['react', 'react-dom'],
        index: "./app/index"
    },
    module:{
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env','@babel/preset-react']
              }
            }
        }, {
            test: /\.tsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'ts-loader'
            }
        },{
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: [MiniCssExtractPlugin.loader,
              'css-loader',
              { 
                  loader: 'postcss-loader', 
                  options: { 
                    ident: 'postcss',
                    plugins: (loader) => [
                        require('autoprefixer')(),
                    ] }
                }
            ]
        },{
            test: /\.less$/,
            exclude: /(node_modules|bower_components)/,
            use: [ MiniCssExtractPlugin.loader,
              'css-loader',
              { 
                  loader: 'less-loader', 
                  options: { sourceMap: true}
                },
                { 
                    loader: 'postcss-loader', 
                    options: { 
                      ident: 'postcss',
                      plugins: (loader) => [
                          require('autoprefixer')(),
                      ] }
                  }
            ]
        },{
            test:/\.(sa|sc)ss$/,
            exclude: /(node_modules|bower_components)/,
            use: [MiniCssExtractPlugin.loader, 
              'css-loader',
              { 
                  loader: 'sass-loader', 
                  options: { sourceMap: true}
                },
                { 
                    loader: 'postcss-loader', 
                    options: { 
                      ident: 'postcss',
                      plugins: (loader) => [
                          require('autoprefixer')(),
                      ] }
                  }
            ]
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
      }),new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
        ignoreOrder: true,
    })],
    output: {
        path: __dirname + '/static/dist/',
        filename: '[name].bundle.js'
    }
}