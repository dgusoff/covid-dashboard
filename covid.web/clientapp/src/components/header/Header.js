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
require("./header.scss");
var react_router_dom_1 = require("react-router-dom");
var About_1 = require("../test-components/About");
var SimpleLineChart_1 = require("./../test-components/SimpleLineChart");
var Header = /** @class */ (function (_super) {
    __extends(Header, _super);
    function Header() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Header.prototype.render = function () {
        return (React.createElement(react_router_dom_1.HashRouter, null,
            React.createElement("nav", { className: "navbar navbar-expand-sm navbar-light bg-light" },
                React.createElement("a", { className: "navbar-brand", href: "#" }, "CoVid DB"),
                React.createElement("div", { className: "navbar-collapse", id: "navbarNav" },
                    React.createElement("ul", { className: "navbar-nav" },
                        React.createElement("li", { className: "nav-item active" },
                            React.createElement("a", { className: "nav-link", href: "#" }, "Home")),
                        React.createElement("li", { className: "nav-item" },
                            React.createElement(react_router_dom_1.Link, { className: "nav-link", to: '/Charts' }, "About"))))),
            React.createElement(react_router_dom_1.Route, { exact: true, path: '/', render: function (props) { return React.createElement(SimpleLineChart_1.CovidLineCharts, null); } }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/Charts", render: function (props) { return React.createElement(About_1.About, null); } })));
    };
    return Header;
}(React.Component));
exports.Header = Header;
//# sourceMappingURL=Header.js.map