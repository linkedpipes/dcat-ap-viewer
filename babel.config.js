module.exports = (api) => {

    api.cache.using(() => process.env.NODE_ENV);

    const presets = [
        "@babel/preset-react",
        [
            "@babel/preset-env",
            {
                "targets": {
                    "ei": 11,
                    "chrome": 41
                }
            }
        ]
    ];

    const plugins = [];

    const ignore = [];

    if (api.env(["development"])) {
        plugins.push("react-hot-loader/babel");
        ignore.push("node_modules");
    }

    return {
        "presets": presets,
        "plugins": plugins,
        "ignore": ignore
    }
};