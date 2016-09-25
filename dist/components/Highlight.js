(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "dompurify"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("dompurify"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.dompurify);
        global.Highlight = mod.exports;
    }
})(this, function (exports, _react, _dompurify) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _dompurify2 = _interopRequireDefault(_dompurify);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Highlight = function (_React$Component) {
        _inherits(Highlight, _React$Component);

        function Highlight() {
            _classCallCheck(this, Highlight);

            return _possibleConstructorReturn(this, (Highlight.__proto__ || Object.getPrototypeOf(Highlight)).apply(this, arguments));
        }

        _createClass(Highlight, [{
            key: "highlightText",
            value: function highlightText(text) {
                if (text) {
                    text = _dompurify2.default.sanitize(text);
                    return _react2.default.createElement("div", { dangerouslySetInnerHTML: { __html: text } });
                } else {
                    return _react2.default.createElement("div", null);
                }
            }
        }, {
            key: "render",
            value: function render() {
                return this.highlightText(this.props.text);
            }
        }]);

        return Highlight;
    }(_react2.default.Component);

    exports.default = Highlight;
});