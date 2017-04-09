/**
 * Created by zhaowei on 16/12/9.
 */
/**
 * 在浏览器中保存会话值
 *
 * @module plugins
 */
var angular = window.angular;
var localStorage = window.localStorage;
var md = angular.module("session", []);


/**
 * 在浏览器中保存会话值
 *
 * @class session(浏览器会话)
 */
md.provider("session", sessionProvider);

var ifStorage = !!localStorage;
function setCookieValue(name, value, time) {
    setCookie(name, value, time);
}


function getCookieValue(name) {
    var pattern = RegExp(name + "=[^;]*");
    var matched = document.cookie.match(pattern);
    if (matched) {
        var cookie = matched[0].split('=');
        var value = cookie[1];
        return value && decodeURIComponent(value);
    }
    return false;
}

//将session值保存在cookie
function setCookieValue(name, value, time1, options) {
    options = options || {};
    var time = parseTime(time1);
    var current = new Date().getTime();
    var x = [
        encodeURIComponent(name),
        "=",
        encodeURIComponent(value),
        time ? ";expires=" + new Date(current + time).toUTCString() : "",
        options.path ? '; path=' + options.path : '',
        options.domain ? '; domain=' + options.domain : '',
        options.secure ? '; secure' : ''
    ].join("");
    document.cookie = x;
}
//如果没设置时间则将session值保存在sessionStorage
//若设置了时间则保存在localstorage中
function setStorageValue(name1, value1, time1) {
    var time = parseTime(time1),
        name = encodeURIComponent(name1),
        value = encodeURIComponent(value1);

    if (!time) {
        localStorage.setItem(name, value);
    } else {
        var expireTime = new Date().getTime() + parseTime(time);
        localStorage.setItem(name, expireTime + "#%#" + value);
    }

}
//获取storage中找到值，如果设置了过期时间，与当前时间匹配，如果超时返回空，并删除localstorage中的值
function getStorageValue(name) {
    var value = localStorage[name] || localStorage[name];
    if (value && (value + "").indexOf("#%#") > 0) {
        var splits = (value + "").split("#%#");
        var time = splits[0];
        if (Number(time) > new Date().getTime()) {
            value = splits[1];
        } else {
            value = undefined;
            localStorage.removeItem(name);
            localStorage.removeItem(name);
        }
    }
    return value && decodeURIComponent(value);
}
function deleteStorageValue(name) {
    localStorage.removeItem(name);
    localStorage.removeItem(name);
}

function deleteCookieValue(name) {
    document.cookie = encodeURIComponent(name) + "=;'Thu, 01 Jan 1970 00:00:00 GMT'";
}
//TODO: support months and years.
var timeRegx = /(([0-9]+)\s(seconds|minutes|hours|days|weeks))+/g;
function getTime(v, type) {
    if (type === "seconds") {
        return v * 1000;
    } else if (type === "minutes") {
        return v * 60000;
    } else if (type === "hours") {
        return v * 3600000;
    } else if (type === "days") {
        return v * 86400000;
    } else if (type == "weeks") {
        return v * 604800000;
    }
}
function parseTime(v) {
    var time = 0;
    if (typeof(v) === "number") {
        time = Math.floor(v);
    } else if (typeof(v) == "string") {
        v.replace(timeRegx, function (r, s, value, type) {
            time += getTime(value, type);
        });
    }
    return time;
}

function sessionProvider() {


    this.$get = [sessionGet];

    sessionGet.$inject = [];
    function sessionGet() {

        var getFn = ifStorage ? getStorageValue : getCookieValue,
            setFn = ifStorage ? setStorageValue : setCookieValue,
            deleteFn = ifStorage ? deleteStorageValue : deleteCookieValue;

        /**
         * 获取session值
         *
         * @method get
         * @param {String} 键值
         * @return {String} session中存储的字符串
         */
        function getValue(name) {
            return getFn(name);
        }

        /**
         * 删除session中存储的值
         *
         * @method remove
         * @param {String} 键值
         */
        function deleteValue(name) {
            if (!angular.isArray(name)) {
                name = [name];
            }
            angular.forEach(name, function (v) {
                deleteFn(v);
            });
        }

        /**
         * 向session中存储字符串 时间格式支持"seconds minutes hours days weeks",比如 "2 days and 4 hours"
         *
         * @method set
         * @param {String} 键
         * @param {String} 值
         * @param {String} 过期时间
         */
        function setValue(name, value, time) {
            setFn(name, value, time);
        }


        return {
            get: getValue,
            set: setValue,
            remove: deleteValue
        };
    }

}