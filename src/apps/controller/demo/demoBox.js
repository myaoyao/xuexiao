/**
 * Created by zhaowei on 17/2/24.
 */

var md = require("../../module/app");
md.controller('demoBoxCtrl', demoBoxCtrl);

demoBoxCtrl.$inject = ["$scope", "$state", "$stage"];
function demoBoxCtrl($scope, $state, $stage) {
    $scope.jumpSub = function (item) {
        $state.transitionTo(item.name);
    };
}

