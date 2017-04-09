/**
 * Created by zhaowei on 2016/12/6.
 */
var md = require("../../module/app");
md.controller('adminCtrl', adminCtrl);

adminCtrl.$inject = ["$rootScope", "$scope", "$state", "theme", "session", "$window", "$stage"];
function adminCtrl($rootScope, $scope, $state, theme, session, $window, $stage) {
    /**主题颜色配置，根据gulpfile.js内的COLORS对象配置**/
    $scope.themeChange = function (name) {
        theme.setTheme(name)
    };
    $scope.themes = theme.themeList;

    $scope.jump = function (item) {
        // if (item.data && item.data.char && item.data.char.length) {
        //     $state.transitionTo(item.data.char[0].name);
        // } else {
        //     $state.go(item.name);
        // }
        $state.go(item.name, {pageSize: 10, pageNumber: 1});
        $scope.PhoneNav = !$scope.PhoneNav;
    };
    $scope.jumpSub = function (item) {
        $state.transitionTo(item.name);
    };
    $scope.showPhoneNav = false;
    $scope.showPhoneNav = function () {
        $scope.PhoneNav = !$scope.PhoneNav
    };

    $scope.showThemeKey = false;
    $scope.showTheme = function () {
        $scope.showThemeKey = !$scope.showThemeKey;
    };
    $scope.showUserBoxKey = false;
    $scope.showUserBox = function () {
        $scope.showUserBoxKey = !$scope.showUserBoxKey;
    };
    angular.element(document).on('click', function (event) {
        if (event.target.className == "clickBtn") return;
        $scope.showThemeKey = false;
        $scope.showUserBoxKey = false;
        $scope.$apply();
    });
    $scope.userName = session.get("userName");
    $scope.goOut = function () {
        session.remove("access_token");
        session.remove("scope");
        $state.go("login")

    };
    $scope.goResetPassword = function () {
        // $state.go('admin.resetPassword', {user: $scope.userName});
        // $scope.showUserBoxKey = false;
        $state.go('admin.settingPsw', {user: $scope.userName});
        $scope.showUserBoxKey = false;
    };

    $scope.changLg = function () {
        if (window.i18next.language == 'ch') {
            session.set("lg", "en");
        } else {
            session.set("lg", "ch");
        }
        $window.location.reload();
    };
}


