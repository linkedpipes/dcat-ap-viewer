const path = require("path");

const config = {
    "devtool": "source-map",
    "entry": [
        path.join(__dirname, "client/index.jsx")
    ],
    "output": {
        "path": path.resolve(__dirname, "build"),
        "filename": "bundle.js",
        "publicPath": "/public/"
    },
    "resolve": {
        "modules": ["client", "node_modules"],
        "extensions": [".js", ".jsx"]
    },
    "module": {
        "loaders": [{
            "test": /\.jsx?$/,
            "exclude": /node_modules/,
            "loaders": ["babel-loader"]
        // }, {
        //     "test": /\.css$/,
        //     "loader": "style-loader!css-loader?importLoaders=1"
        // }, { "test": /\.(png|woff|woff2|eot|ttf|svg)$/,
        //     "loader": 'url-loader?limit=100000'
        }
        ]
    }
};

module.exports = config;
