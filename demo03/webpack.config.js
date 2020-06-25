const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.less$/,
                //要是用多个loader处理用use
                use:[
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                //问题：默认处理不了html中img标签图片
                //处理图片资源
                test:/\.(jpg|png|gif)$/,
                //使用一个loader 
                //下载url-loader file-loader 
                loader:'url-loader',
                options:{
                    //图片大小小于8kb，就会被base64处理
                    //优点：减少请求数量（减轻服务器压力）
                    //缺点：图片体积会更大（文件请求速度更慢）
                    limit:8 * 1024,
                    //问题：url-loader默认使用es6模块化解析，
                    //而html-loader引入图片是commonjs解析时会出问题：[object Module] -->我并没有出现，可以解析成打包后的图片路径
                    //解决：关闭url-loader es6模块化，使用commonjs解析
                    esModule:false,
                    //给图片重命名
                    //[hash:10]取图片的hash的前10位
                    //[ext]取文件原来拓展名
                    name:'[hash:10].[ext]'
                }
            },{
                test:/\.html$/,
                //处理html文件中的img图片（负责引入img,从而能被url-loader进行处理）
                loader:'html-loader',
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    mode:'development'
}