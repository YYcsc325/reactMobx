const path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');                // 插件都是一个类，所以我们命名的时候尽量用大写开头
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // 拆分css样式的插件
let CleanWebpackPlugin = require('clean-webpack-plugin');           // 打包之前将dist目录下的文件都清空
let webpack = require('webpack');


module.exports = {
    mode: 'development',                   // 模式配置(现在为开发模式)

    devServer:{                            
		contentBase: './src',              // 找指定文件下进行编译
        inline: true,
        hot: true,                         // 开启热更新
        open: true,                        // 默认编译完打开浏览器
        overlay: true,                     // 浏览器页面上显示错误
        port: 8004,                        // webpack-dev-server --port 8004
        historyApiFallback: true
    },
    
    //多页面怎么配置
    entry: {                               // 入口文件
        index: [/*'babel-polyfill',*/'./src/index.js'],   // babel-polyfill兼容浏览器，使得Object.assin()这种能用
        // login: './src/login.js'
    },               
    output: {                              // 出口文件
        filename: "bundle.js",             // 打包后的文件名称
        path: path.resolve('dist')         // 打包后的目录，必须是绝对路径
    },     
    optimization: {                        // 提取公共代码
        splitChunks: {
            cacheGroups: {
                vendor: {                   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',         // 打包后的文件名，任意命名     
                    priority: 10            // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                },
                utils: {                    // 抽离自己写的公共代码，utils里面是一个公共类库 
                    chunks: 'initial',
                    name: 'utils',          //  任意命名
                    minSize: 0              // 只要超出0字节就生成一个新包
                }
            }
        }
    },         
    module: {                              // 处理对应模块
        rules:[
            {
                test: /\.less$/,           // 解析css
                use: ExtractTextWebpackPlugin.extract({                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader','postcss-loader','less-loader'],    // 从右向左解析,postcss打包css前缀
                    publicPath: '../'                                      // 配置图片打包的相对路径
                    /*   
                        use: [                                             // 也可以这样写，这种方式方便写一些配置参数
                            {loader: 'style-loader'},
                            {loader: 'css-loader'}
                        ]
                    */
                }),
                include: [                                                 // 配置包含项
                    path.resolve(__dirname,'./node_modules/antd'),
                    path.resolve(__dirname,'./src')
                ]
                //exclude:/node_modules/                                   // 排除node_module下的匹配js文件   还需在.babelrc中做预设处理
            },
            {
                test: /\.css$/,     
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader','postcss-loader'],
                    publicPath: '../'                                      
                }),
                include: [                                                 
                    path.resolve(__dirname,'./node_modules/antd'),
                    path.resolve(__dirname,'./src')
                ]
            },
            {
                test: /\.(png|gif|jpg|svg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',             // css背景图片打包
                        options: {
                            limit: 8192,                  // 小于8k的图片自动转成base64格式，并且不会存在实体图片,并且打包进js
                            // outputPath: 'images/',        // 图片打包后存放的目录   
                            name:'images/[hash:8].[name].[ext]' //8192之外的图片直接打包进这个文件夹内
                        }
                    }
                ]
            },
            {
                test:/\.js$/,                             // 打包js文件         
                use: 'babel-loader',                      // babel-loader既可以做到代码转成ES5
                include: /src/,                           // 只转化src目录下的js
                exclude: /node_modules/                   // 排除掉node_modules，优化打包速度
            },
            {
                test: /\.(htm|html)$/,                    // img标签图片打包
                use: 'html-withimg-loader'
            },
            {                                             // 字体图标跟svg图片根据file-loader打包
                test: /\.(eot|ttf|woff|otf)(\?.*)$/,
                exclude:/node_modules/,
                loader: 'file-loader',                    // 这里使用use: 'file-loader' 会报错
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        // 省略后缀
        extensions: ['.js', '.jsx', '.json', '.css', '.less'],
        // 别名
        alias: {
          '@pages':path.join(__dirname,'src/pages'),
          '@com':path.join(__dirname,'src/component'),
          '@actions':path.join(__dirname,'src/redux/actions'),
          '@reducers':path.join(__dirname,'src/redux/reducers'),
        }
    },                          
    plugins: [                                          // 对应的插件     
        new HtmlWebpackPlugin({                         // 通过new一下这个类来使用插件
            favicon: '',
            title: 'myProject',
            template: './src/index.html',               // 在src目录下创建一个index.html页面当做模板来用(可以指定html作为模板)
            filename:'index.html',                      
            hash: true,                                 // 会在打包好的bundle.js后面加上hash串
            inject: true,                               // 是否自动添加资源引入
            chunks: ['vendor','index','utils']          // index.html跟optimization配置的需要单独打包
        }),
        new CleanWebpackPlugin() ,                      // 打包之前将dist目录下的文件都清空
        new ExtractTextWebpackPlugin('css/style.css'),  // 拆分后会把css文件放到dist目录下的css/style.css
        new webpack.HotModuleReplacementPlugin(),       // 热更新-配置server,hot:true
        // 配置eslint 
        new webpack.LoaderOptionsPlugin({
            options:{
                eslint:{
                    configFile: path.resolve(__dirname,'./eslintrc')
                }
            }
        })
        // new HtmlWebpackPlugin({            
        //     favicon: '',  
        //     title: '',
        //     template: './src/login.html',  
        //     filename: 'login.html',
        //     hash: true,                    
        //     inject: true,
        //     chunks: ['login']                     
        // }),
    ],              
}

// optimization :{          // 新增4.0的配置
//      splitChunks: {
//          chunks: 'all',  // 插件的作用范围all全部，async按需加载，initial入口文件  三选一
//          minSize: 30000, // 最小打包的尺寸  超过30kb才会打包
//          minChunks: 1,   // 最小引入第三方库
//          maxAsyncRequests: 5, // 最大异步请求chunks
//          maxInitialRequests: 3, //最大初始化chunks
//          automaticNameDelimiter: '.', //如果不能指定name，自动生成name的分隔符 (runtime.[name])
//          name: true,// split的chunks name 
//          cacheGroups:{//缓存组
//             vendors:{ // split 'node_modules'目录下被打包的代码到 'js/vendors.js && .css' 没找到可打包的文件的话，则没有
//                 chunks: 'initial', // 左右是入口文件
//                 test:/[\\/]node_modules[\\/]/, //过滤打包node——modules文件下的引用的库
//                 name:'vender',
//                 minChunks: 1, //最小引入数 
//                 priority: -10, //优先级
//                 enforce: true
//             }
//         }
//      },
//      runtimeChunk:{    // 运行时需要打包的js文件
//          name:'manifest'
//      }
// }
