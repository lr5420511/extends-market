'use strict';

const [resolve, VueLoader, UglifyjsWP] = [
    require('path').resolve,
    require('vue-loader/lib/plugin'),
    require('uglifyjs-webpack-plugin')
];

const prod = /^production$/i.test(process.env.NODE_ENV);

const conf = module.exports = {
    entry: {
        'extends-market': './src/market/index.js',
        'text-pencil': './src/extends/text-pencil/index.js',
        'to-where': './src/extends/to-where/index.js'
    },
    output: {
        path: resolve(process.cwd(), 'dist'),
        publicPath: 'dist',
        filename: '[name].js'
    },
    devtool: prod ? false : 'source-map',
    devServer: { historyApiFallback: { index: './index.html' } },
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: ['babel-loader'],
                exclude: /node_modules/i
            },
            {
                test: /\.vue$/i,
                loader: ['vue-loader']
            },
            {
                test: /\.css$/i,
                loader: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/i,
                loader: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [new VueLoader()]
};

if(prod) {
    conf.optimization = {
        minimizer: [
            new UglifyjsWP({
                test: /\.js$/i,
                sourceMap: false
            })
        ]
    };
}