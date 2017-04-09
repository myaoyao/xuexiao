/**
 * Created by zhaowei on 16/12/16.
 */
var md = require("../../module/demo");
md.controller('laydateCtrl', laydateCtrl);
laydateCtrl.$inject = ["$scope"];
function laydateCtrl($scope) {
    $scope.startTime = new Date();

}
