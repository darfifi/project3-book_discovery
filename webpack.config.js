const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'The Book discovery',
            template: './src/index.html'
        })
    ],

    module: {
        rules: [
            
            {
                test: /\.(css|scss|sass)$/i,
                use: ['style-loader', 'css-loader']
            },
            
            {
                test: /\.(ico|jpg|png|jpeg)$/i,
                type: 'asset/resource'
                // use: ['url-loader', 'file-loader']
            },
            
            {
                test: /\.html$/i,
                use: ['html-loader']
            }
        ]
    },

    devServer: {
        static: path.resolve(__dirname, 'dist'),
        open: true
    }
}