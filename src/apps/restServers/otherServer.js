/**
 * Created by zhaowei on 16/12/9.
 */
var md = require("../module/other");
md.factory('otherServer', ['$resource', function ($resource) {
    return $resource('rest/:param1/:param2/:param3/:param4/:param5', {}, {
        test: {
            method: 'POST',
            params: {param1: 'login'},
            isArray: false
        },
        login: {
            method: 'GET',
            params: {param1:'oauth2',param2:'access_token'},
            isArray: false
        }
    })
}])

