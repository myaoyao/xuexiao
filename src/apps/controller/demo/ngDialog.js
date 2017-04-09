/**
 * Created by zhaowei on 16/12/14.
 */
var md = require("../../module/demo");
md.controller('ngDialogCtrl', ngDialogCtrl);
ngDialogCtrl.$inject = ["$scope", "$stage", "ngDialog"];
function ngDialogCtrl($scope, $stage, ngDialog) {
    $scope.open = function () {
        ngDialog.open({
            template: 'aioPublic/page/ngDialog/test.html',
            className: 'ngdialog-theme-default boxCenter',
            controller: ["$scope",
                function ($scope) {
                    $scope.save = function () {
                        $scope.closeThisDialog('$closeButton')
                    };

                }],
            scope: $scope,
            closeByDocument: false
        })
    };
    $scope.name = "122";
    $scope.open1 = function () {
        ngDialog.open({
            template: 'aioPublic/page/ngDialog/test.html',
            className: 'detailsDialog',
            controller: ["$scope",
                function (scope) {
                    scope.save = function () {
                        $scope.name = "7777777";
                        scope.closeThisDialog()
                    };

                }]
        })
    };
    $(document).on('click', function (event) {
        if ($(event.target).parents('.ngdialog').length) return;
        ngDialog.closeAll()
    });

}
