/**
 * Created by zhaowei on 16/12/9.
 */
var md = require("../module/app");
md.service("theme", themeService);

themeService.$inject = ["$parse", "session"];

function themeService($parse, session) {
    this.themeList = [
        {
            name: "default",
            color: "#495348",
            active: true
        },
        {
            name: "theme1",
            color: "#666600"
        },
        {
            name: "theme2",
            color: "#333366"
        },
        {
            name: "theme3",
            color: "#993366"
        },
        {
            name: "theme4",
            color: "#99CC66"
        },
        {
            name: "theme5",
            color: "#43b77d"
        }
    ];
    this.setTheme = function (themeName) {
        angular.forEach(this.themeList, function (item) {
            if (item.name == themeName) {
                item.active = true;
            } else {
                item.active = false;
            }
        });
        angular.element(document.getElementById("theme")).attr("href", "aioPublic/assets/style/style_" + themeName + ".css");
        session.set("theme", themeName);
    }
}
