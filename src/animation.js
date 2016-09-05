/**
 * Animation.js
 * build by rwson @9/5/16
 * mail:rw_Song@sina.com
 * a canvas particle library
 */

"use strict";


//	UMD
(function(root, factory) {

    if (typeof define === 'function' && define.amd) {

        // requirejs
        define(["tween"], function(TWEEN) {
            return factory(TWEEN);
        });

    } else if (root !== undefined) {

        // script tag
        root.Animation = factory(TWEEN);

    }

})(this, function(tween) {

    //	check is has required tween engine
    if (!tween) {
        throw "Animation.js dependence tween.js";
    }

    //	default config
    var _default = {
        el: "#canvas",
        width: 400,
        height: 400,
        imgUrl: ""
    };

    //	Animation constructor
    var Animation = (function(tween) {
        var _finalCfg, _width, _height, _context, _img;

        return function(config) {

            _finalCfg = _merge(_copy(_default), config || {});

            console.log(_finalCfg.el);

            //	check the el option is or not avaliable
            if (_finalCfg.el) {
                if (!_finalCfg.el.tagName) {
                    /**
                     * {
                     * 	  el: "#canvas",
                     * 	  ...
                     * }
                     */
                    _finalCfg.el = document.querySelector(_finalCfg.el);
                    if (_finalCfg.el.tagName.toLowerCase() !== "canvas") {
                        throw "the el you passed in Animation must be a canvas DOM Object or a selector of a canvas element, but you passed in " + _finalCfg.el;
                    }
                    _context = _finalCfg.el.getContext("2d");
                } else if(_finalCfg.el.tagName.toLowerCase() === "canvas") {
                    /**
                     * {
                     * 	  el: document.querySelector("#canvas"),
                     * 	  ...
                     * }
                     */
                    _context = _finalCfg.el.getContext("2d");
                }
            } else {
            	throw "the el you passed in Animation must be a canvas DOM Object or a selector of a canvas element, but you passed in " + _finalCfg.el;
            }

            //	get the width and height of canvas
            _width = _finalCfg.el.width;
            _height = _finalCfg.el.height;

            //	 construct the img Object
            _img = new Image();
            _img.setAttribute("src", _finalCfg.imgUrl);

            _img.onload = function() {
				console.log(this);
            };
            _img.onerror = function(){
				throw "the imgUrl property you passed '" + _finalCfg.imgurl + "' is unavaliable, please check!"
            };
        };
    })(tween);

    //	get the className of an Object
    function _typeOf(obj) {
        return {}.toString.call(obj).slice(8, -1);
    }

    //	deep copy an Object
    function _copy(obj) {
        var res, fnStr, isNative, type, typeIn;

        //	test "function forEach() { [native code] }" like expression's Regexp
        isNative = /\[native\s{1}code\]/g;
        type = _typeOf(obj);
        if (type !== "Array" || type !== "Object" || type !== "Function") {
            return obj;
        }
        switch (type) {
            case "Array":
                res = [];
                for (var i = 0, len = obj.length; i < len; i++) {
                    if (typeIn !== "Array" || typeIn !== "Object" || typeIn !== "Function") {
                        res.push(obj[i]);
                    } else {
                        _copy(obj[i]);
                    }
                }
                break;
            case "Object":
                res = {};
                for (var i in obj) {
                    typeIn = _typeOf(obj[i]);
                    if (typeIn !== "Array" || typeIn !== "Object" || typeIn !== "Function") {
                        res[i] = obj[i];
                    } else {
                        _copy(obj[i]);
                    }
                }
                break;
            case "Function":
                fnStr = obj.toString();
                //	test this function is or not one of native functions(Array.prototype.forEach .etc)
                if (isNative) {
                    res = obj;
                } else {
                    res = new Function("return " + fnStr);
                    for (var i in obj) {
                        res[i] = obj[i];
                    }
                }
                break;
            default:
                break;
        }
        return res;
    }

    //	merge two Object
    function _merge(obj1, obj2) {
        for (var i in obj2) {
            obj1[i] = obj2[i];
        }
        return obj1;
    }

    return Animation;

});
