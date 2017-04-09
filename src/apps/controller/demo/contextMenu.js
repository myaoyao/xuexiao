/**
 * Created by zhaowei on 16/12/22.
 */

var md = require("../../module/demo");
md.controller('contextMenuCtrl', demoContextMenuCtrl);

demoContextMenuCtrl.$inject = ["$scope"];

function demoContextMenuCtrl($scope) {

    $scope.contextMenuTestList = [
        {
            name: "菜单测试11"
        },
        {
            name: "菜单测试22"
        },
        {
            name: "菜单测试33"
        },
        {
            name: "菜单测试44"
        }
    ];
    $scope.contextMenuList = [
        {
            name: "删除删除删除删除删除删除",
            disable: true
        },
        {
            name: "删除",
            active: true,
            children: [
                {
                    name: "dfdfdfdfddfdf",
                    disable: false,
                    active: true,
                    children: [
                        {
                            name: "撒绝境逢生",
                            icon: "ic"
                        }
                    ]
                },
                {
                    name: "798"
                },
                {
                    name: "kjio"
                },
                {
                    name: "dfdfdfdfddfdf"
                }
            ]
        },
        {
            name: "sdjdssjk",
            children: [
                {
                    name: "add"
                },
                {
                    name: "add"
                },
                {
                    name: "add"
                }
            ]
        }
    ];
    //菜单测试点击回调函数
    $scope.contextMenuCallBack = function (clickKey, id) {
        console.log(id);
    };
}