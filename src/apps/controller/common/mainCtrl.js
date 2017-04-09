/**
 * Created by zhaowei on 2016/12/6.
 */
var md = require("../../module/app");
md.controller('mainCtrl', MainCtrl);

MainCtrl.$inject = ["$scope", "$rootScope"];

function MainCtrl($scope, $rootScope) {

    $rootScope.rootLoadingShow = false;
}


