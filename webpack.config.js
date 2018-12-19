
const { VueLoaderPlugin } = require('vue-loader')
var webpack = require('webpack')
var path = require('path')
module.exports = {
    context: __dirname,
    entry: {
        index: "./index.ts"
    },
    output: {
        path: __dirname + "/publish",
        filename: "[name].js",
        publicPath:"/publish/",
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json'
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".js", '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            appendTsSuffixTo: [/\.vue$/]
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: {
                            loaders: {
                              'scss': 'style-loader!css-loader!sass-loader'
                            }
                          }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|svg|ttf|eot|woff2)$/,
                use: [
                    {
                        loader: 'url-loader?limit=1024&name=[path][name].[ext]&publicPath=publish/',
                    }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader','sass-loader']
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            'window.jQuery':"jquery"
        })
    ],
    devServer: {
        //contentBase: path.join(__dirname, "publish"),
        port: 7000,
        inline: true,
        hot: true,
        proxy: {
            '/api/*':{
                target:'http://localhost:83',
                secure:false,
                changeOrigin:true
            }
        }
    }
}