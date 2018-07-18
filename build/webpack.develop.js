const webpack = require("webpack");
const merge = require('webpack-merge');
const common = Object.assign({}, require("./webpack.common"));

module.exports = merge(common, {
    "mode": "development",
    "devtool": "eval",
    "entry": [
        "webpack-hot-middleware/client"
    ],
    "devServer": {
        "hot": true
    },
    "module": {
        "rules": [
            {
                "test": /\.css$/,
                "loader": "style-loader!css-loader"
            }
        ]
    },
    "plugins": [
        new webpack.HotModuleReplacementPlugin()
    ]
});
