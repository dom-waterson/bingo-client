(function () {
    'use strict';
    var express = require('express');
    var morgan = require('morgan');

    var app = express();
    app.use(morgan('combined'));
    app.use(express.static(process.cwd()+ '/.build/main-app/app', {maxAge:86400000}));
    module.exports = app;
})();