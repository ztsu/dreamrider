const path = require("path");

module.exports = {
    entry: {
        "state" : "./src/state",
        "react" : "./src/react"
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
