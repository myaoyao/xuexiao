/**
 * Created by zhaowei on 16/12/20.
 */
//http://www.lovewebgames.com/jsmodule/paging.html#page=9
var md = require("../module/app");
md.directive("pagination", function () {
    return {
        restrict: "A",
        replace: true,
        scope: {
            pagination: "=",
            callBack: "=",
            pageCount: "=",
            pageSize: "="
        },
        link: function (scope, element) {
            var p = new Paging();
            scope.$watch("pageCount", function (n, o) {
                element.html("");
                if (!n) return;
                init();
            });
            scope.$watch("pagination", function (n, o) {
                element.html("");
                if (!n || !scope.pageCount) return;
                init();
            });

            function init() {
                //if(scope.pageCount/scope.pageSize<=1) return;
                p.init({
                    target: element,
                    toolbar: true,
                    pagesize: scope.pageSize,
                    current: scope.pagination,
                    count: scope.pageCount,
                    callback: function (page, size, count) {
                        scope.callBack(page, size, count)
                    }

                });
            }

        }
    }
});