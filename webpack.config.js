const path = require('path');
const webpack = require('webpack');
const debug = process.env.NODE_ENV !== "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    mode: debug?'development':'production',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname,'docs'),
        publicPath: '/marketing-website/'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use:{
                    loader: 'babel-loader',
                    options:{
                        presets: ['env']                        
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: !debug,
                            sourceMap: debug
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: !debug,
                            sourceMap: debug
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(jpg|png|svg|gif|jpeg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: debug?null:'/img',
                        publicPath: debug?null:'/img'
                    }
                }
            },
            {
                test: /\.mp4$/,
                use: [{
                    loader: 'file'
                }]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            chunkFilename: "[id].css",
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new CleanWebpackPlugin(['dist'])
    ],
    devServer: {
        port: 9000,
        // hot: true
      },
    watch: debug
};