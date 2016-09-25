(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "./Highlight", "./Parser"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("./Highlight"), require("./Parser"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Highlight, global.Parser);
        global.Chordify = mod.exports;
    }
})(this, function (exports, _react, _Highlight, _Parser) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Highlight2 = _interopRequireDefault(_Highlight);

    var _Parser2 = _interopRequireDefault(_Parser);

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

    var Chordify = function (_React$Component) {
        _inherits(Chordify, _React$Component);

        function Chordify(props) {
            _classCallCheck(this, Chordify);

            var _this = _possibleConstructorReturn(this, (Chordify.__proto__ || Object.getPrototypeOf(Chordify)).call(this, props));

            _this.parser = new _Parser2.default(props.input, props.color);
            return _this;
        }

        _createClass(Chordify, [{
            key: "componentDidMount",
            value: function componentDidMount() {
                // for test
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(_Highlight2.default, { text: this.parser.wrap() });
            }
        }]);

        return Chordify;
    }(_react2.default.Component);

    exports.default = Chordify;
});