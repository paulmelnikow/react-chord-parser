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
        function Parser(input) {
            _classCallCheck(this, Parser);

            this.input = input;
            this.regex = /((\\)?\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)/g;
        }

        _createClass(Parser, [{
            key: "all",
            value: function all() {
                var matches = this.input.match(this.regex);

                if (!matches) {
                    return [];
                }

                return matches.filter(function (match) {
                    return !match.startsWith("\\");
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
            value: function wrap(callback) {
                return this.input.replace(this.regex, function (match) {
                    if (match.startsWith("\\")) {
                        return match.replace("\\", "");
                    } else {
                        return callback(match);
                    }
                });
            }
        }]);

        return Parser;
    }();

    exports.default = Parser;
});