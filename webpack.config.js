var path = require("path");
var webpack = require("webpack");
var DIST_DIR = path.resolve(__dirname, "dist");
var SRC_DIR = path.resolve(__dirname, "client");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var extractPlugin = new ExtractTextPlugin({
	filename: "basic.css"
});

var config = {
	entry: ['webpack-hot-middleware/client',SRC_DIR + "/app/finapp"],
	output: {
		path: DIST_DIR + "/app",
		filename: "bundle.js"
		//publicPath: "/dist"
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: SRC_DIR,
				use: [
					{
						loader: "babel-loader",
						options: {
							presets: ["react","es2015","stage-2"]
						}	
					}
					
				]
			},
			{
				test: /\.scss$/,
				use: extractPlugin.extract({
					use: [
						"css-loader",
						"sass-loader"

					],
					fallback: 'style-loader'
				})
			},
			{
				test: /\.(html)$/,
				use: ['html-loader']
			},
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
						  publicPath: 'img/',
						  outputPath: 'img/',
						  name: '[name].[ext]',
						}
                    }
                ]
            }

		]
	},
	plugins: [
		extractPlugin,
		new HTMLWebpackPlugin({
			template: 'client/index.html',
			title: 'Finapp'
		}),
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoEmitOnErrorsPlugin()
	]
};

module.exports = config;
