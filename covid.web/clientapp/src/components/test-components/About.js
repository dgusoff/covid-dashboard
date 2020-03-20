"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var About = /** @class */ (function (_super) {
    __extends(About, _super);
    function About() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    About.prototype.render = function () {
        return (React.createElement("div", { className: "container" },
            React.createElement("h2", null, "Corona Virus Dashboard"),
            React.createElement("div", null, "Written March 13-16, 2020"),
            React.createElement("div", null,
                "Uses data from Johns Hopkins and open sources directly from ",
                React.createElement("a", { href: "https://github.com/CSSEGISandData/COVID-19" }, "here."),
                " "),
            React.createElement("div", null, "By Derek Gusoff"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { href: "https://github.com/dgusoff" }, "Github")),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://twitter.com/dgusoff" }, "Twitter")),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://www.linkedin.com/in/derekgusoff" }, "LinkedIn"))),
            React.createElement("img", { src: "/bob.png" }),
            React.createElement("h3", null, "Uses"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { href: "https://docs.microsoft.com/en-us/dotnet/core/" }, ".NET Core 3.1")),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://reactjs.org/" }, "React")),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://www.typescriptlang.org/" }, "Typescript")),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://www.chartjs.org/" }, "Chart.JS")),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://getbootstrap.com/" }, "Bootstrap")))));
    };
    return About;
}(React.Component));
exports.About = About;
//# sourceMappingURL=About.js.map