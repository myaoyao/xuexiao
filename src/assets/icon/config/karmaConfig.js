// Browsers
// Possible Values:
// Chrome (launcher comes installed with Karma)
// ChromeCanary (launcher comes installed with Karma)
// PhantomJS (launcher comes installed with Karma)
// Firefox (launcher requires karma-firefox-launcher plugin)
// Opera (launcher requires karma-opera-launcher plugin)
// Internet Explorer (launcher requires karma-ie-launcher plugin)
// Safari (launcher requires karma-safari-launcher plugin)

module.exports = function (config) {
    config.set({
        frameworks: ["jasmine"],
        browsers: ["Chrome"],
        reporters: ["mocha"],
        basePath: "./"
    });
};