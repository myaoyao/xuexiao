/**
 * Created by zhaowei on 16/12/9.
 */
var md = require("../module/other");
md.factory('otherServer', ['$resource', function ($resource) {
    return $resource('rest/:param1/:param2/:param3/:param4/:param5', {}, {
        addUser: {
            method: 'POST',
            params: {param1: 'user',param2:'addUser'},
            isArray: false
        },
        login: {
            method: 'POST',
            params: {param1:'user',param2:'login'},
            isArray: false
        }
    })
}])

