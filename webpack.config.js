const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const clientConfig = {
    devtool: 'source-map',
    entry: {
        client: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
    },
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
                        name: '/images/[contenthash].[ext]',
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}

const serverConfig = {
    target: 'node',
    devtool: 'source-map',
    entry: {
        server: './src/server.js',
    },
    output: {
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs',
        // path: __dirname + '/dist',
    },
    externals: {
        mongoose: 'mongoose',
        passport: 'passport',
        morgan: 'morgan',
        multer: 'multer',
        express: 'express',
        bodyParser: 'body-parser',
        cookieParser: 'cookie-parser',
        multi: 'multi',
        mongodb: 'mongodb',
        encoding: 'encoding',
        redux: 'redux',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        node: 'v14.15.0',
                                    },
                                    modules: false, // Needed for tree shaking to work.
                                },
                                '@babel/preset-react',
                            ],
                        ],
                    },
                },
            },
            // {
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, { loader: 'css-loader' }],
            // },
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
                        name: '/images/[contenthash].[ext]',
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
}

module.exports = [serverConfig, clientConfig]
