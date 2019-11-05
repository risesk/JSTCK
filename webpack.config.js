const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
	entry: {
		index: './src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js',
		publicPath: ''
	},
	module: {
		rules: [
			{
				test: /\.(woff|woff2|ttf|otf)$/i,
				use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/Inter-UI/[name].[ext]'
                    }
                    }
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'images/[name].[ext]'
                    }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true, // webpack@1.x
                            disable: true, // webpack@2.x and newer
                        }
                    }
				]
			},
			{
				test: /\.css$/i,
				use: [
					(isDev ? 'style-loader' : {loader: MiniCssExtractPlugin.loader
						// , options: 
						// {
						// 	publicPath: '../' // path to director where assets folder is located
						// }
					}),
					{
						loader: 'css-loader',
						options: { importLoaders: 1 }
					},
					'postcss-loader'
				] 
			}
		]
	},
	plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/gi,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default'],
			},
			canPrint: true
	   }),
		new HtmlWebpackPlugin({
			inject: false, 
			hash: true, 
			template: './src/index.html',
			chunks: ['index'], 
			filename: 'index.html' 
		}),
		new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/login.html',
            chunks: ['index'],
            filename: 'login.html'
		}),
		new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './src/signup.html',
            chunks: ['index'],
            filename: 'signup.html'
        }),
		new WebpackMd5Hash(),
		new webpack.DefinePlugin({
			'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	   })
    ]
}