/**
 * Created by zhaowei on 2016/12/6.
 */
var md = angular.module("demoModule", []);

md.config(appConfig);
appConfig.$inject = ["$stateProvider"];
function appConfig($stateProvider) {
    var routeList = [
        {
            name: "demo",
            abstract: true,
            url: '/demo',
            templateUrl: ('aioPublic/page/demo/demoBox.html'),
            reloadOnSearch: false,
            controller: 'demoBoxCtrl',
            data: {
                name: "demo例子",
                parent: "bigMenu",
                role: ["admin"]
            }
        },
        {
            name: "demo.icon",
            url: '/icon',
            templateUrl: ('aioPublic/page/demo/icon.html'),
            reloadOnSearch: false,
            controller: 'iconCtrl',
            data: {
                name: "icon图标",
                parent: "demo",
                role: ["admin"]
            }
        },
        {
            name: "demo.pagination",
            url: '/pagination/:pageSize/:page',
            templateUrl: ('aioPublic/page/demo/pagination.html'),
            reloadOnSearch: false,
            controller: 'paginationCtrl',
            data: {
                name: "pagination分页",
                parent: "demo",
                role: ["admin"]
            }
        },
        {
            name: "demo.ngDialog",
            url: '/ngDialog',
            templateUrl: ('aioPublic/page/demo/ngDialog.html'),
            reloadOnSearch: false,
            controller: 'ngDialogCtrl',
            data: {
                name: "ngDialog弹框",
                parent: "demo",
                role: ["admin"]
            }
        },
        {
            name: "demo.laydate",
            url: '/laydate',
            templateUrl: ('aioPublic/page/demo/laydate.html'),
            reloadOnSearch: false,
            controller: 'laydateCtrl',
            data: {
                name: "laydate日期插件",
                parent: "demo",
                role: ["admin"]
            }
        },
        {
            name: "demo.contextMenu",
            url: '/contextMenu',
            templateUrl: ('aioPublic/page/demo/contextMenu.html'),
            reloadOnSearch: false,
            controller: 'contextMenuCtrl',
            data: {
                name: "右键菜单",
                parent: "demo",
                role: ["admin"]
            }
        },
        {
            name: "demo.tooltip",
            url: '/tooltip',
            templateUrl: ('aioPublic/page/demo/tooltip.html'),
            reloadOnSearch: false,
            controller: 'tooltipCtrl',
            data: {
                name: "信息提示框",
                parent: "demo",
                role: ["admin"]
            }
        }
    ];
    angular.forEach(routeList, function (item) {
        $stateProvider.state(item.name, item);
    });
}
module.exports = md;
