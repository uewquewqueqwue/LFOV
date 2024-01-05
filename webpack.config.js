const path = require("path")

module.exports = {
    entry: {
        "home": "./assets/scripts/app/homeApp.js",
        "search": "./assets/scripts/app/searchApp.js",
    },
    output: {
        filename: "static/[name].bundle.js",
        path: path.resolve(__dirname),
        assetModuleFilename: "static/[name][ext]",
        library: "library"
    },
    resolve: {
        extensions: [".ts", "..."],
    },    
    module: {
        rules: [
            {
                test: /\.ts/i,
                use: "ts-loader",
                exclude: /node_modules/,
            },            
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
            {
                test: /\.s[a|c]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
              },
        ]
    }
}