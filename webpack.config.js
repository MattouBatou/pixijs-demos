const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
	entry: {
		app: './src/main.tsx',
	},
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js',
	},
	devServer: {
		static: path.resolve(__dirname, 'build'),
		compress: true,
		port: 9000,
		https: false,
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: [
								'@babel/preset-env',
								'@babel/preset-react',
								{
									plugins: [
										'@babel/plugin-proposal-class-properties',
									],
								},
							],
						},
					},
				],
			},
			{
				test: /\.s(a|c)ss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: isDevelopment,
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
			{
				test: /\.(png|jpe?g|gif|jp2|webp)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							useRelativePath: true,
							publicPath: 'assets/images/',
							name: '[name].[ext]',
							emitFile: false,
						},
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.scss', '.ts', '.tsx'],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HTMLWebpackPlugin({ template: './src/index.html' }),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'assets'),
					to: path.resolve(__dirname, 'build/assets'),
					noErrorOnMissing: true,
				},
			],
		}),
		new webpack.DefinePlugin({
			'typeof CANVAS_RENDERER': JSON.stringify(true),
			'typeof WEBGL_RENDERER': JSON.stringify(true),
		}),
	],
	optimization: {
		minimize: isDevelopment ? false : true,
	},
};
