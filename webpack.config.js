const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'); // NodeJS 模块，帮助我们拼接路径

module.exports = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        clean: true, // 生成文件前先清空 dist 目录
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.tsx?$/, // 正则表达式匹配要编译的文件
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [  // loader 执行顺序由下向上
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    }
}