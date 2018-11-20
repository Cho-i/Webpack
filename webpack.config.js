const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	mode:'development',
	entry: {
		app: '',
	},
	output: {
		path: '',
		filename: '',
		publicPath: '',
	},
	module: {


	},
	plugins: [],
	optimization: {

	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js','.json','.jsx','.css'],
	},
};