const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevMode = process.env.NODE_ENV === 'development';
const developmentPath = 'http://localhost:8080';
const productionPath =
    'https://pushkarskayarita.github.io/investigation-board/';

const clientConfig = {
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        publicPath: isDevMode ? developmentPath : productionPath,
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        port: 8080,
    },
    entry: path.resolve(__dirname, './src/index.js'),
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },

            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName:
                                    '[name]__[local]___[hash:base64:5]',
                            },
                        },
                    },
                    'postcss-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '/images/[name].[ext]',
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
};

module.exports = clientConfig;
