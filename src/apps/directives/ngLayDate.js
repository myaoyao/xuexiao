/**
 * Created by zhaowei on 16/12/7.
 */
var md = require("../module/app");
md.directive('ngLayDate', ["$timeout", function ($timeout) {
    return {
        require: '?ngModel',
        restrict: 'A',
        scope: {
            ngModel: '=',
            maxDate: '@',
            minDate: '@'
        },
        link: function (scope, element, attr, ngModel, dateFilter) {
            if (!ngModel) return;
            var _date = null, _config = {};
            // 渲染模板完成后执行
            $timeout(function () {
                // 初始化参数
                _config = {
                    elem: '#' + attr.id,
                    format: attr.format !== undefined && attr.format !== '' ? attr.format : 'YYYY-MM-DD hh:mm:ss',
                    max: attr.hasOwnProperty('maxDate') ? attr.maxDate : '',
                    min: attr.hasOwnProperty('minDate') ? attr.minDate : '',
                    istime: true, //是否开启时间选择
                    //isclear: false, //是否显示清空
                    //istoday: false, //是否显示今天
                    //issure: false, //是否显示确认
                    festival: true, //是否显示节日
                    choose: function (data) {
                        scope.$apply(setViewValue);
                    }
                };
                // 初始化
                _date = laydate(_config);
                // 监听日期最大值
                if (attr.hasOwnProperty('maxDate')) {
                    attr.$observe('maxDate', function (val) {
                        _config.max = val;
                    });
                }
                // 监听日期最小值
                if (attr.hasOwnProperty('minDate')) {
                    attr.$observe('minDate', function (val) {
                        _config.min = val;
                    });
                }

                // 模型值同步到视图上

                ngModel.$render = function () {
                    element.val(ngModel.$viewValue || '');
                };

                // 监听元素上的事件
                element.on('blur keyup change', function () {
                    scope.$apply(setViewValue);
                });

                setViewValue();

                // 更新模型上的视图值
                function setViewValue() {
                    var val = element.val();
                    ngModel.$setViewValue(val);
                }
            }, 0);
        }
    };
}]);

