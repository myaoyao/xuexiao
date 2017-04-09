/**
 * Created by zhaowei on 16/12/27.
 */

var md = require("../module/app");
md.filter('numberChinese', function () {
    return function (num, key, name) {
        var activeObj = "";
        var objList = [
            {
                name: "等级",
                list: ["全部", "一级", "二级", "三级", "四级", "五级"]
            },
            {
                name: "启动状态",
                list: {
                    "UNKNOWN": {
                        name: "未知...",
                        icon: ""
                    },
                    "PENDING": {
                        name: "未知...",
                        icon: ""
                    },
                    "RUNNING": {
                        name: "运行中",
                        icon: "btn-success"
                    },
                    "SUCCESS": {
                        name: "成功",
                        icon: "btn-success"
                    },
                    "FAILED": {
                        name: "失败",
                        icon: "btn-danger"
                    },
                    "KILLED": {
                        name: "关闭",
                        icon: "btn-info"
                    },
                    "ERROR": {
                        name: "出错",
                        icon: "btn-danger"
                    },
                    "WARN": {
                        name: "警告",
                        icon: "btn-warning"
                    },
                    "STOPED": {
                        name: "停止",
                        icon: "btn-info"
                    },
                    "NOT_INSTALL": {
                        name: "启动失败",
                        icon: "btn-danger"
                    },
                    "PENDING": {
                        name: "查询中…",
                        icon: ""
                    },
                    "ONLINE":{
                        name: "运行中…",
                        icon: "btn-success"
                    },
                    "OFF_LINE":{
                        name: "停止",
                        icon: "btn-danger"
                    }
                }
            },


        ];

        for (var i = 0; i < objList.length; i++) {
            if (objList[i].name == key) {
                activeObj = objList[i];
                break
            }
        }
        if (activeObj && $.isArray(activeObj.list)) {
            return activeObj.list[num];
        } else if (activeObj) {
            return activeObj.list[num][name];
        } else {
            return num;
        }
    }
});