/**
 * Created by zhaowei on 2016/12/5.
 */


var md = angular.module("idcubeApp", [
    "ui.router",
    "ngResource",
    "ngAnimate",
    "session",
    "$stage",
    "ngDialog",
    "oitozero.ngSweetAlert",
    "ngFileUpload",

    "otherModule",
    "demoModule",


]);


md.config(["$stateProvider", "ngDialogProvider", "$urlRouterProvider",
    function ($stateProvider, ngDialogProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/login');
        var routeList = [
            {
                name: "admin",
                abstract: true,
                url: '/admin',
                templateUrl: ('aioPublic/page/common/admin.html'),
                reloadOnSearch: false,
                controller: 'adminCtrl'
            }
        ];
        angular.forEach(routeList, function (item) {
            $stateProvider.state(item.name, item);
        });


        //ngDialog默认配置
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            plain: false,
            showClose: false,
            closeByDocument: false,
            closeByEscape: true,
            appendTo: false,
            preCloseCallback: function () {
                console.log('default pre-close callback');
            }
        });

    }
]);

md.run(["session", "theme", "$rootScope", "$state", "$templateCache", "$stage", "ngDialog", "otherServer",
    function (session, theme, $rootScope, $state, $templateCache, $stage, ngDialog, otherServer) {
        //初始化设置主题
        var themeSession = session.get("theme") ? session.get("theme") : "default";
        theme.setTheme(themeSession);
        //启动指纹数据收集服务
        //fingerprintServer.run();
        function hasPrivilege(toState) {
            var prScope = session.get("scope") ? session.get("scope").split("#%#") : [];
            var isKey = prScope.length ? false : true;
            angular.forEach(prScope, function (item) {
                angular.forEach(toState.data.role, function (obj) {
                    if (obj == item) isKey = true;
                });
            });
            return isKey;
        }

        var routeList = $state.get();
        $rootScope.$on('$stateChangeStart', onBeforeChange);
        function onBeforeChange(event, toState, toStateParams) {
            var navData = [];
            angular.forEach(routeList, function (obj) {
                if (obj.data && obj.data.parent == "bigMenu" && hasPrivilege(obj)) {
                    navData.push(obj);
                }
            });
            angular.forEach(navData, function (item) {
                item.data.char = [];
                angular.forEach(routeList, function (obj) {
                    if (obj.data && item.name == obj.data.parent && hasPrivilege(obj)) {
                        item.data.char.push(obj);
                        obj.data.char = [];
                        angular.forEach(routeList, function (subObj) {
                            if (subObj.data && obj.name == subObj.data.parent && hasPrivilege(subObj)) {
                                obj.data.char.push(subObj)
                            }
                        })
                    }
                })
            });
            angular.forEach(navData, function (item) {
                item.active = false;
                if (item.name == toState.name) {
                    item.active = true;
                    $rootScope.subMenu = [];
                } else {
                    if (item.data && item.data.char && item.data.char.length) {
                        angular.forEach(item.data.char, function (obj) {
                            obj.active = false;
                            if (toState.name == obj.name) {
                                $rootScope.subMenu = item.data.char;
                                obj.active = true;
                                item.active = true
                            }
                            if (obj.data && obj.data.char && obj.data.char.length) {

                                angular.forEach(obj.data.char, function (subObj) {
                                    subObj.active = false;
                                    if (subObj.name == toState.name) {

                                        $rootScope.subMenu = item.data.char;
                                        obj.active = true;
                                        item.active = true;
                                        subObj.active = true;
                                    }
                                })
                            }
                        });
                    }
                }


            });
            if (!toState.data.parent) {
                $rootScope.subMenu = [];
            }
            $rootScope.menu = navData;


            if (typeof(toState) !== 'undefined') {
                $templateCache.remove(toState.templateUrl);
            }
            if (!hasPrivilege(toState) && toState.data && toState.data.role && toState.data.role.length) event.preventDefault();
        }

        $rootScope.$on("$httpException", function (ev, data) {
            if (data) {
                switch (data.status) {
                    case 400:
                        $stage.danger("传入参数错误!请认真检查传入参数");
                        break;
                    case 401:
                        $state.go("login");
                        //ngLogin();
                        break;
                    case 500:
                        $stage.danger("后端500错误");
                        break;
                }
            }
        });

        function ngLogin() {
            ngDialog.open({
                template: 'aioPublic/page/ngDialog/loginDialog.html',
                className: 'ngdialog-theme-default loginDialog',
                controller: ["$scope", "otherServer", "session", "employeeServer", "$stage", "SweetAlert",
                    function ($scope, otherServer, session, employeeServer, $stage, SweetAlert) {

                        $scope.password = atob(session.get("password"));
                        $scope.userName = session.get("userName");
                        $scope.loginGo = loginGo;
                        $scope.closeThisDialog = function () {
                            $state.go("login");
                            ngDialog.close();
                        };

                        function loginGo() {
                            var json = {
                                username: $scope.userName,
                                password: btoa($scope.password),
                                grant_type: "password",
                                client_id: "1"
                            };
                            otherServer.login({}, json, function (data) {
                                    if ($scope.KeepPwd == true) {
                                        session.set("userName", $scope.userName);
                                        session.set("password", $scope.password);
                                        session.set("keepPwd", true);
                                    } else {
                                        session.remove("password");
                                        session.remove("keepPwd");
                                    }
                                    session.set("access_token", data.access_token);
                                    session.set("scope", data.scope);

                                    $scope.text = "登录";

                                    ngDialog.close();
                                },
                                function (data) {
                                    if (data.data.error == "insufficient_scope") {
                                        $stage.danger("用户名已经被禁用!")
                                    } else if (data.data.error == "invalid_grant") {
                                        $stage.danger("用户名或密码错误!")
                                    }
                                });
                        }
                    }],
                closeByDocument: false
            });
        }

    }
]);
module.exports = md;