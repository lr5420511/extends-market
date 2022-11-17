'use strict';

const Px2remPP = require('postcss-pxtorem');

Object.assign(exports, {
    plugins: [
        new Px2remPP({
            propList: ['*'],
            rootValue: 30
        })
    ]
});