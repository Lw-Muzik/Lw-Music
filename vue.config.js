// var nodeExternals = require('webpack-node-externals');
module.exports = {
    pluginOptions: {
        electronBuilder: {
            nodeIntegration: true,
            builderOptions: {
                publish: ['github'],
                // asar: true,
                appId: 'com.lwzikizmp.blabsmusic',
                productName: 'B-labs Music',
                linux: {
                    target:['AppImage','deb']
                }

            },
        },
    },
};

