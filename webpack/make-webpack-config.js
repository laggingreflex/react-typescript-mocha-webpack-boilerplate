var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var DEVELOPMENT = 'development';
var TEST = 'test';
var PRODUCTION = 'production';

// usage 
// in another file, require this export and export the result of this function
// Ex:
//      var makeConfig = require('./make-webpack-config')
//      module.exports = makeConfig({
//          environment: <string>,   
//          title: <string>,
//          fileName: <string>
//          devServer: <boolean>,
//          apiPath: <string>
//      });

module.exports = function(options) {

    // ENVIRONEMENT (REACT UNDERSTANDS 'production' ENVIRONMENT)
    var environment = options.environment && options.environment.toLowerCase() || DEVELOPMENT;

    // in production files are minimized by default
    var minimize = options.minimize || environment === PRODUCTION;

    var optionsFilename = options.filename;
    var fileNameWithDot = optionsFilename && typeof optionsFilename === 'string' ? optionsFilename + '.' : '';

    var codeFolderRegExp;
    var outputFilename;
    var outputPath;
    var externals;
    switch (environment) {

        case PRODUCTION:
            codeFolderRegExp = /src/;
            outputFilename = fileNameWithDot + 'bundle.min.js';
            outputPath = './dist';
            break;

        case TEST:
            codeFolderRegExp = /test/;
            outputFilename = fileNameWithDot + 'bundle.test.js';
            outputPath = './dist-test';
            externals = {
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            }
            break;

        case DEVELOPMENT:
        default:
            codeFolderRegExp = /src/;
            outputFilename = fileNameWithDot + 'bundle.js';
            outputPath = './dist-dev';
            break;

    }

    // APP TITLE
    var title = options.title;

    // MODULE LOADERS
    var preloaders = [];
    var loaders = [
        {
            // load .scss files
            test: /\.scss$/,
            // extract the resulting css / sass text, will be added in an external stylesheet below
            loader: ExtractTextPlugin.extract("css!sass"),
            // exclude node dependencies
            include: /stylesheets/,
        },
        {
            // load .ts and .tsx files
            test: /\.tsx?$/,
            // handled by ts-loader
            loader: 'ts-loader',
            exclude: function(path) {
                return codeFolderRegExp ? !codeFolderRegExp.test(path) : false;
            }
        }
    ];

    // PLUGINS
    var plugins = [
        // set environment global variable used in the js code
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(environment),
                API_PATH: options.apiPath || ''
            }
        }),    
        // transform the .ejs template in .src to a .html file populated with the variables passed here
        new HtmlWebpackPlugin({
            // web page title
            title: title,
            // target file name
            filename: 'index.html',
            // source template
            template: './src/index.ejs',
            // inject the .js files at the end of the body tag
            inject: 'body',
            // favicon used by the web page
            favicon: '',    
            minify: minimize ? {
                                    // minimize any embedded js and css code
                                    minifyCSS: true,
                                    minifyJS: true,
                                    // remove html comments
                                    removeComments: true
                                } 
                                : false
        }),
        // put the extracted css text in an external stylesheet that will be loaded from the target html head 
        new ExtractTextPlugin(fileNameWithDot + 'styles.css', {
            allChunks: true
        })
    ];

    // MINIMIZE 
    
    var devtool;
    var sourceMap;
    if (minimize) {

        devtool = 'eval';

        // minimize the code
        plugins.push(
            // uglify the js code
            new webpack.optimize.UglifyJsPlugin({}),
            // avoid code duplication that may happen when several modules require the same module for instance
            new webpack.optimize.DedupePlugin()
        );

    } else {

        // use source map to load sources in browser
        devtool = 'source-map';

        sourceMap = {
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
            test: [ /\.js$/ ],
            loader: 'source-map-loader',
            // exclude the node dependencies
            exclude: /node_modules/
        };
        preloaders.push(sourceMap);

    }

    // FINAL CONFIG
    var config = {
        entry: environment === TEST ? './test/index.tsx' : './src/index.tsx',
        output: {
            path: outputPath,
            filename: outputFilename
        },
        devtool: devtool,
        resolve: {
            extensions: [ '', '.ts', '.tsx', '.js', '.jsx' ]
        },
        module: {
            loaders: loaders,
            preloaders: preloaders
        },
        plugins: plugins
    };

    if (externals) {
        // some configurations may need externals
        // for instance Enzyme need externals to properly work with React + Mocha / Karma
        config.externals = externals;
    }

    if (options.devServer) {
        // if specified, we can use a local server with a proxy that redirects requests to specific paths
        // this is used in development mode where we want to run the front-end locally and interact with a remote back-end 
        // we can use this configuration in future versions in case we need to plug / unplug different back-ends 
        config.devServer = {
            // the folder with the default content
            contentBase: outputPath,
            // server host (localhost)
            host: '0.0.0.0',
            // port
            port: 3000,
            proxy: {
                // paths handled by the proxy
                '/api/*': {
                    // new target server
                    target: 'http://localhost:18120',
                    secure: false
                }
            }
        }
    }

    return config;

};