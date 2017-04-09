/**
 * Created by zhaowei on 16/12/20.
 */

var md = require("../module/app");
md.directive('ngLoading', function () {
    return {
        restrict: 'A',
        scope: {
            loadingShow: '=',
            random: '@',
            ngLoading: '@'
        },
        link: function (scope, element, attr) {
            element.addClass('ngLoading');
            var loadingitem = 1;
            if (scope.ngLoading) loadingitem = scope.ngLoading;
            var loadingElm = angular.element("<div class='loading' style='display: none'></div>");
            var loading = angular.element("<div class='load" + loadingitem + "'><div class='loader'></div></div>");
            loadingElm.append(loading);
            element.append(loadingElm);

            scope.$watch('loadingShow', function (n, o) {
                setShowHide();
            });
            var time = 0;

            function setShowHide() {
                if (scope.random) {
                    loading[0].className = 'load' + parseInt(Math.random() * (4 - 1 + 1) + 1, 10);
                }
                if (scope.loadingShow) {
                    time = setTimeout(function () {
                        loadingElm.show();
                    }, 500)
                } else {
                    clearTimeout(time);
                    loadingElm.hide();
                }
            }
        }
    };
});


