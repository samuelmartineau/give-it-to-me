var express = require('express'),
    jade = require('jade'),
    assign = require('object-assign');

var DEFAULT_CONFIG = {
    appName: 'Hello',
    cookieName: 'deviceInfos',
    routePrefix: 'deviceInfos',
    excludePath: '/api',
    headerPrefix: 'WS_',
    infos: '{width: window.innerWidth, height: window.innerHeight}',
    timeout: 0,
    templatePath: __dirname + '/main.jade'
};

function asHeaders(config, datas) {
    return Object.keys(datas)
        .reduce(function(headers, key) {
            headers[config.headerPrefix+key.toUpperCase()] = datas[key];
            return headers;
        }, {});
}

function getMiddlewarePath(prefix) {
   return '/' + prefix + '/getInfos';
}

function createWindowSizeMiddleware(config) {
    return function deviceInfosMiddleware(req, res, next) {
        var deviceInfos,
            datas;

        if (!req.cookies) {
            return next(new Error('You must use the "cookie-parser" middleware before this middleware calling'));
        } else if (!req.body) {
            return next(new Error('You must use the "body-parser" middleware (urlencoded) before this middleware calling'));
        }

        if (req.path.indexOf(config.excludePath) > -1 || req.path.indexOf(config.routePrefix) > -1) {
            return next();
        }

        deviceInfos = req.cookies[config.cookieName];

        if (!deviceInfos) {
            return res.redirect(getMiddlewarePath(config.routePrefix) + '?redirectUrl=' + encodeURIComponent(req.path));
        }

        datas = JSON.parse(deviceInfos);
        req.headers = assign({}, req.headers, asHeaders(config, datas));

        return next();
    };
}

function createRouter(config) {
    var router = express.Router(),
        middlewarePath = getMiddlewarePath(config.routePrefix);

    router.use(createWindowSizeMiddleware(config));

    router.get(middlewarePath, function(req, res) {
        res.send(jade.renderFile(config.templatePath, {appName: config.appName, timeout: config.timeout, infos: config.infos}));
    });

    router.post(middlewarePath, function(req, res) {
        res.cookie(config.cookieName, req.body.params, {expires: 0});
        res.send({redirect: req.query.redirectUrl || ''});
    });

    return router;
}

module.exports = function(config) {
    config = assign({}, DEFAULT_CONFIG, config);
    return createRouter(config);
};
