(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "react", "./components/Highlight", "./chordjs/chord"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("react"), require("./components/Highlight"), require("./chordjs/chord"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Highlight, global.chord);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _Highlight, _chord) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react2 = _interopRequireDefault(_react);

    var _Highlight2 = _interopRequireDefault(_Highlight);

    var _chord2 = _interopRequireDefault(_chord);

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

            _this.removeBraces = function (chord) {
                return chord.replace(/\[(.+)]/, "$1");
            };

            _this.wrap = function () {
                var wrapped = _this.input.replace(_this.regex, function (chord) {
                    return "<a>" + _this.removeBraces(chord) + "</a>";
                });
                return _react2.default.createElement(_Highlight2.default, { text: wrapped });
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

            _this.regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/g;
            _this.input = props.input;
            _this.renderUniqueChords = props.renderUniqueChords || false;
            return _this;
        }

        _createClass(Chordify, [{
            key: "componentDidMount",
            value: function componentDidMount() {}
        }, {
            key: "renderUniqueChords",
            value: function renderUniqueChords() {
                var unique = this.unique();

                var nodes = unique.map(function (chord) {
                    var className = "id" + chord;
                    // const chordjs = ChordJs(null, null, null, null);
                    // ChordJs.chord(className, chord);
                    return _react2.default.createElement("div", { className: className });
                });

                return _react2.default.createElement(
                    "div",
                    null,
                    nodes
                );
            }
        }, {
            key: "renderInput",
            value: function renderInput() {
                return _react2.default.createElement(
                    "div",
                    null,
                    this.wrap()
                );
            }
        }, {
            key: "render",
            value: function render() {
                if (this.renderUniqueChords) {
                    return this.renderUniqueChords();
                } else {
                    return this.renderInput();
                }
            }
        }]);

        return Chordify;
    }(_react2.default.Component);

    exports.default = Chordify;
});