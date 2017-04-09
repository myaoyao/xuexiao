/**
 * Created by zhaowei on 16/12/20.
 */
var md = require("../module/app");
md.factory('httpInterceptor', ['session', '$q', '$rootScope',
    function (session, $q, $rootScope) {
        function loginGo(userName, password) {
            otherServer.login({}, {
                username: userName,
                password: password,
                grant_type: "password",
                client_id: "1"
            }, function (data) {
                if (data.access_token) session.set("access_token", data.access_token, "2hours");
            }, function (data) {

            });
        }

        return {
            request: function (data) {
                var access_token = session.get('access_token') || 1;
                if (!access_token) {
                    var sessionPwd = session.get("password");
                    var sessionUser = session.get("userName");
                    if (sessionPwd && sessionPwd) loginGo(sessionUser, sessionPwd);
                } else {
                    data.headers['Authorization'] = 'Bearer ' + access_token;
                    return data;
                }
            },
            responseError: function responseError(data) {
                if (data.status !== 200) {
                    $rootScope.$broadcast("$httpException", {data: data.data, status: data.status});
                }
                return $q.reject(data);
            }
        };
    }]);

md.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
}]);