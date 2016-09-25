(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.Parser = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

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

    var Parser = function () {
        function Parser(input, color) {
            _classCallCheck(this, Parser);

            this.removeBraces = function (chord) {
                return chord.replace(/\[(.+)]/, "$1");
            };

            this.input = input;
            this.color = color || "#2e6da4";
            this.regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/g;
        }

        _createClass(Parser, [{
            key: "all",
            value: function all() {
                var _this = this;

                var matches = this.input.match(this.regex);

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
            }
        }, {
            key: "unique",
            value: function unique() {
                return this.all().filter(function (chord, index, arr) {
                    return arr.indexOf(chord) === index;
                });
            }
        }, {
            key: "wrap",
            value: function wrap() {
                var _this2 = this;

                return this.input.replace(this.regex, function (chord) {
                    return "<span style=color:" + _this2.color + ">" + _this2.removeBraces(chord) + "</span>";
                });
            }
        }]);

        return Parser;
    }();

    exports.default = Parser;
});