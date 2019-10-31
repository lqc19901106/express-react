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
        },{
            test: /\.css$/,
            exclude: /(node_modules|bower_components)/,
            use: [ {
                loader: 'style-loader',
                options: { injectType: 'singletonStyleTag' },
              },
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
            use: [ {
                loader: 'style-loader',
                options: { injectType: 'singletonStyleTag' },
              },
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
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: [ {
                loader: 'style-loader',
                options: { injectType: 'singletonStyleTag' },
              },
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
      })],
    output: {
        path: __dirname + '/static/dist/',
        filename: '[name].bundle.js'
    }
}