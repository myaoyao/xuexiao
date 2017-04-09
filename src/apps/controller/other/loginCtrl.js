/**
 * Created by zhaowei on 2016/12/6.
 */

var md = require("../../module/other");
md.controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ["$scope","otherServer","session","$state","$stage"];
function loginCtrl($scope,otherServer,session,$state,$stage) {
    $scope.text="登 录"
    //页面启动时赋值
    $scope.KeepPwd=session.get("keepPwd")?true:false;
    $scope.userName=session.get("userName")?session.get("userName"):"";
    $scope.password=session.get("password")?session.get("password"):"";

  /*  otherServer.addUser({},{userName:'zw',passWord:'123456',repeatPassWord:'123456'},function (d) {
        debugger
    })*/
    //登录
    var logining=false;
    $scope.loginGo = function () {

        if(!$scope.userName||!$scope.password){
            $scope.err="请填写完毕再登录！"
            return;
        }
        logining=true;
        $scope.text="登录中…"
        var authInfo = {
            userName: $scope.userName,
            passWord: $scope.password
            //passWord: btoa($scope.password)
        };

        otherServer.login({}, authInfo, function (data) {
            if(data.scope!='admin'){
                $scope.text="登录"
                $scope.err="对不起，你没有权限!"
                return
            }
            if($scope.KeepPwd==true){
                session.set("userName",$scope.userName);
                session.set("password",$scope.password);
                session.set("keepPwd",true);
            }else{
                session.remove("password");
                session.remove("keepPwd");
            }
            session.set("access_token", data.access_token);
            session.set("scope", data.scope);
            $scope.text="登录"
            $stage.success("登陆成功")
            setTimeout(function () {
                $state.go("admin.dashboard")
            },500)

        }, function (error) {
            if(error.data.error=="invalid_grant"){
                $scope.err="用户名和密码错误,请重新输入";
                $scope.loading=false
            }else{
                $stage.danger("后端错误")

            }
            $scope.text="登录"
            logining=false;
        });
    }
    //清空提示
    $scope.clearErr = function () {
        $scope.err="";
    }
    $scope.choose=function () {
        if($scope.KeepPwd==false||$scope.KeepPwd==undefined){
            $scope.KeepPwd=true;
        }else{
            $scope.KeepPwd=false;
        }
    }
    //回车
    $(document).bind('keydown',function (event) {
        if(logining==true) return;
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) { // enter 键
            $scope.loginGo();
        }
    });
}