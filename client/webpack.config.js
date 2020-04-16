const path              = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const src               = path.resolve(__dirname, "src");
const dist              = path.resolve(__dirname, "dist");

function buildModeOptions(mode){
	switch(mode){
		case "production":
			return {
				mode: "production",
				output: {
					filename: "bundle.js",
					path: dist,
					publicPath: "./"
				}
			};

		case "development":
		default:
			return {
				mode: "development",
				output: {
					filename: "bundle.js",
					path: dist,
					publicPath: "/"
				},
				devServer: {
					contentBase: "./dist/"
				}
			};
	}
}// buildModeOptions

function buildConfig(env, args){

	const { mode } = args;

	const modeOptions = buildModeOptions(mode);

	return {
		entry: `${src}/index.js`,
		plugins: [
			new HtmlWebpackPlugin({
				template: `${src}/index.html`
			})
		],
		...modeOptions,
		module: {
			rules: [
				{
					test: /\.(js)$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							plugins: [
								"@babel/plugin-proposal-class-properties",
								"@babel/plugin-proposal-nullish-coalescing-operator",
								"@babel/plugin-proposal-optional-chaining"
							]
						}
					}
				}, {
					test: /\.scss$/,
					use: [
						{
							loader: "style-loader",
							options: {
								injectType: "singletonStyleTag"
							}
						}, {
							loader: "css-loader",
							options: {
								modules: {
									localIdentName: "[folder]__[local]"
								},
								url: false
							}
						}, {
							loader: "sass-loader"
						}
					]
				}
			]
		},
		resolve: {
			alias: {
				ROUTES: `${src}/routes`,
				COMPONENTS: `${src}/components`,
				ELEMENTS: `${src}/elements`,
				PRIMITIVES: `${src}/primitives`,
				SHARED: `${src}/shared`
			}
		}
	};
}// buildConfig

module.exports = buildConfig;

