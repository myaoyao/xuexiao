/**
 * Created by zhaowei on 17/2/23.
 */
var md = require("../../module/demo");
md.controller('tooltipCtrl', tooltipCtrl);
tooltipCtrl.$inject = ["$scope", "$stage"];
function tooltipCtrl($scope, $stage) {
    $scope.warning = function () {
        $stage.warning("warning 提示框")
    };
    $scope.success = function () {
        $stage.success("success 提示框")
    };
    $scope.danger = function () {
        $stage.danger("danger 提示框")
    }
}
