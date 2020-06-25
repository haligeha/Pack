// loader 1.下载 2 使用（配置loader)
// plugins 1.下载 2. 引入 3. 使用
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path: resolve(__dirname,'build')
    },
    module:{
        rules:[
            //loader配置
        ]
    },
    plugins:[
        //plugins配置
        //html-webpack-plugin
        //功能：默认会创建一个空的html，引入打包输出的全部资源（js/css)
        //需求：需要有结构的html文件
       // new HtmlWebpackPlugin()
       new HtmlWebpackPlugin(
           {
               //复制‘./src/index.html’文件，并自动引入打包输出的全部资源
               template:'./src/index.html'
           }
       )

    ],
    mode:'development'
}