/**
 * Created by zhaowei on 2016/12/6.
 */
var md = angular.module("otherModule", []);

md.config(appConfig);
appConfig.$inject = ["$stateProvider"];
function appConfig($stateProvider) {
    var routeList = [
        {
            name: "login",
            url: '/login',
            templateUrl: ('aioPublic/page/other/login.html'),
            reloadOnSearch: false,
            data: {
                name: "登陆",
                parentNode: false

            },
            controller: 'loginCtrl'
        },
        {
            name: "admin.settingPsw",
            url: '/userCenter/settingPsw',
            templateUrl: ('aioPublic/page/userCenter/settingPsw.html'),
            reloadOnSearch: false,
            controller: 'settingPsw',
            data: {
                name: "修改密码"
            }
        }
    ];
    angular.forEach(routeList, function (item) {
        $stateProvider.state(item.name, item);
    });
}
module.exports = md;
