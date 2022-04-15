# Deps
path = require 'path'
fs = require 'fs'
VueLoaderPlugin = require 'vue-loader/lib/plugin'

# Webpack config
module.exports =
	mode: 'development'

	# The main entry points
	entry: external: './app.coffee'

	# Where to write files
	output:
		path: path.resolve __dirname, '../static'
		filename: '[name].js'

	module:
		rules: [

			# Vue components
			{
				test: /\.vue$/
				loader: 'vue-loader'
			}

			# Coffeescript
			{
				test: /\.coffee$/
				use: [
					'babel-loader'
					'coffee-loader'
				]
			}

			# JS through Babel
			{
				test: /\.js$/,
				use: ['babel-loader']
			}

			# Stylus
			{
				test: /\.styl(us)?$/,
				use: [
					'vue-style-loader'
					'css-loader'
					# 'postcss-loader'
					{
						loader: 'stylus-loader'
						options: import: path.resolve __dirname,
							'../assets/definitions.styl'
					}
				]
			}

			# CSS
			{
				test: /\.css$/,
				use: [
					'vue-style-loader'
					'css-loader'
					# 'postcss-loader'
				]
			}

			# Pug
			{
				test: /\.pug$/
				loader: 'pug-plain-loader'
			}

			# Graphql
			{
				test: /\.gql?$/
				loader: 'webpack-graphql-loader'
			}

			# Font Files
			{
				test: /\.(eot|ttf|otf|woff|woff2)(\?\S*)?$/i
				loader: 'file-loader?name=dist-[name]-[hash:6].[ext]'
			}

			# Image Files
			{
				test: /\.(png|jpe?g|gif|svg|webp)$/i
				loader: 'url-loader'
				options:
					limit: 1000
					name: 'dist-[name]-[hash:6].[ext]'
			}
		]

	resolve:
		alias:
			vue$: "vue/dist/vue.esm.js"
			'~': path.resolve __dirname, '../'
		extensions: [".js", ".vue", ".coffee", ".json"]

	plugins: [
		new VueLoaderPlugin()
	]
