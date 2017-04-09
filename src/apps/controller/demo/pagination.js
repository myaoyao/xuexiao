/**
 * Created by zhaowei on 16/12/14.
 */
var md = require("../../module/demo");
md.controller('paginationCtrl', paginationCtrl);
paginationCtrl.$inject = ["$scope"];
function paginationCtrl($scope) {
    $scope.onPageChange = function () {
        // ajax request to load data
        console.log($scope.currentPage);
    };

    // set pagecount in $scope

    $scope.pageCurrent = 1;
    $scope.pageSize = 10;
    $scope.callBack = function (page) {

    };
    setTimeout(function () {
        $scope.pageCount = 200;
        $scope.$apply();
    }, 1000);
}
