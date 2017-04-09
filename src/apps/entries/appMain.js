/**
 * Created by zhaowei on 2016/12/5.
 */
bulk = require('bulk-require');

bulk(__dirname, [
    '../plugin/**/*.js',
    '../servers/**/*.js',
    '../directives/**/*.js',
    '../filters/**/*.js',
    '../restServers/**/*.js',
    '../controller/**/*.js'
]);

module.exports = {};

