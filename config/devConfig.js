const path=require('path');
const webpack=require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const devConfig={
    mode:"development",
    entry:path.resolve(__dirname,'../src/main.js'),
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename: '[name].bundle.js',
        publicPath:'dist/'
    },
    devServer:{
        contentBase:'./',
        port:8084,
        hot:true
    },
    module:{
        rules:[
            {test:/\.vue$/,loader:'vue-loader'},
            {test:/\.css$/,loader:['style-loader','css-loader']},
            {test:/\.less$/,loader:['style-loader','css-loader','less-loader']},
            {
                test:/.(png|jpg|git)$/,loader:'file-loader',options:{
                    outputPath: 'images/'
                }
            },
            {
                test:/.(woff|woff2|eot|ttf|otf)$/,
                use:{
                    loader:'file-loader',
                    options:{
                        outputPath: 'fonts'
                    }
                }
            },
            {
                test:require.resolve('jquery'),
                use:[{
                    loader:'expose-loader',
                    options:'$'
                }]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
module.exports=devConfig;
