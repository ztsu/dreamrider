const path = require("path");

module.exports = {
    entry: {
        "store" : "./src/store",
        "connect" : "./src/connect"
    },
    output: {
        path: path.join(__dirname, "lib"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    }
};
