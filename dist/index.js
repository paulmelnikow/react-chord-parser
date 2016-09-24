(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "../etc/raphael.chord"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("../etc/raphael.chord"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.raphael);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _raphael) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _raphael2 = _interopRequireDefault(_raphael);

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

            _this.wrap = function () {
                return _this.input.replace(_this.regex, function (chord) {
                    return _react2.default.createElement(
                        "a",
                        null,
                        _this.removeBraces(chord)
                    );
                });
            };

            _this.all = function () {
                var matches = _this.input.match(_this.regex);

                if (!matches) {
                    return [];
                }

                var matchesNormal = matches.map(function (match) {
                    return _this.removeBraces(match);
                });

                return matchesNormal.sort(function (a, b) {
                    a = a.toLowerCase();
                    b = b.toLowerCase();
                    return a > b ? 1 : a < b ? -1 : 0;
                });
            };

            _this.unique = function () {
                return _this.all().filter(function (chord, index, arr) {
                    return arr.indexOf(chord) === index;
                });
            };

            _this.removeBraces = function (chord) {
                return chord.replace(/\[(.+)]/, "$1");
            };

            _this.regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/;
            _this.input = props.input;
            return _this;
        }

        _createClass(Chordify, [{
            key: "componentDidMount",
            value: function componentDidMount() {}
        }, {
            key: "renderUnique",
            value: function renderUnique() {
                var unique = this.unique();

                unique.forEach(function (chord) {
                    var className = "id" + chord;
                    _raphael2.default.chord(className, chord);
                    return _react2.default.createElement("div", { className: className });
                });
            }
        }, {
            key: "render",
            value: function render() {
                return _react2.default.createElement(
                    "div",
                    null,
                    this.wrap()
                );
            }
        }]);

        return Chordify;
    }(_react2.default.Component);

    exports.default = Chordify;
});