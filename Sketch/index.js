function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { css } from '@emotion/react';
import { useStableCallback } from "../useStableCallback";
import React, { useEffect, useRef, useState } from 'react';
import { createContext } from "../createContext";
import { useThrottle } from "../useThrottle";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var WIDTH = 960;
var HEIGHT = 540;
var _createContext = createContext('CanvasRoot'),
  _createContext2 = _slicedToArray(_createContext, 2),
  CanvasRootProvider = _createContext2[0],
  useCanvasRoot = _createContext2[1];
function Canvas() {
  var _useCanvasRoot = useCanvasRoot('Canvas'),
    canvasRef = _useCanvasRoot.canvasRef,
    startDrawing = _useCanvasRoot.startDrawing,
    endDrawing = _useCanvasRoot.endDrawing,
    draw = _useCanvasRoot.draw;
  var handleMouseMove = useThrottle(draw, 5);
  return /*#__PURE__*/_jsx("canvas", {
    onMouseDown: startDrawing,
    onMouseUp: endDrawing,
    onMouseOut: endDrawing,
    onMouseMove: handleMouseMove,
    width: WIDTH,
    height: HEIGHT,
    css: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        outline: 1px solid black;\n      "]))),
    ref: canvasRef
  });
}
function CanvasRoot(_ref) {
  var children = _ref.children;
  var canvasRef = useRef(null);
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    strokes = _useState2[0],
    setStrokes = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    currentStroke = _useState4[0],
    setCurrentStroke = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isDrawing = _useState6[0],
    setIsDrawing = _useState6[1];
  var _useState7 = useState(-1),
    _useState8 = _slicedToArray(_useState7, 2),
    history = _useState8[0],
    setHistory = _useState8[1];
  var redrawRef = useRef(false);
  function startDrawing(e) {
    if (!canvasRef.current) return;
    var rect = canvasRef.current.getBoundingClientRect();
    var point = {
      x: e.nativeEvent.clientX - rect.left,
      y: e.nativeEvent.clientY - rect.top
    };
    setCurrentStroke([point]);
    setIsDrawing(true);
    var ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
  }
  function endDrawing(e) {
    if (!canvasRef.current) return;
    if (!isDrawing) return;
    var rect = canvasRef.current.getBoundingClientRect();
    var point = {
      x: e.nativeEvent.clientX - rect.left,
      y: e.nativeEvent.clientY - rect.top
    };
    setIsDrawing(false);
    setCurrentStroke([].concat(_toConsumableArray(currentStroke), [point]));
    var copiedStrokes = JSON.parse(JSON.stringify(strokes));
    var sliceStrokes = copiedStrokes.splice(0, history + 1);
    setStrokes([].concat(_toConsumableArray(sliceStrokes), [{
      points: currentStroke
    }]));
    setHistory(history + 1);
  }
  var draw = useStableCallback(function draw(e) {
    console.log('draw');
    if (!canvasRef.current) return;
    if (!isDrawing) return;
    var rect = canvasRef.current.getBoundingClientRect();
    var point = {
      x: e.nativeEvent.clientX - rect.left,
      y: e.nativeEvent.clientY - rect.top
    };
    setCurrentStroke([].concat(_toConsumableArray(currentStroke), [point]));
    var ctx = canvasRef.current.getContext('2d');
    console.log(point);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
  });
  function undo() {
    history > 0 && setHistory(history - 1);
    redrawRef.current = true;
  }
  function redo() {
    history < strokes.length - 1 && setHistory(history + 1);
    redrawRef.current = true;
  }
  function jumpTo(to) {
    to >= 0 && to <= strokes.length - 1 && setHistory(to);
    redrawRef.current = true;
  }
  useEffect(function () {
    if (!canvasRef.current || !redrawRef.current) return;
    var ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    var copiedStrokes = JSON.parse(JSON.stringify(strokes));
    var sliceStrokes = copiedStrokes.splice(0, history + 1);
    for (var i = 0; i < sliceStrokes.length; i++) {
      var points = sliceStrokes[i].points;
      for (var j = 0; j < points.length; j++) {
        if (j === 0) {
          ctx.beginPath();
          ctx.moveTo(points[j].x, points[j].y);
        } else {
          ctx.lineTo(points[j].x, points[j].y);
        }
      }
      ctx.stroke();
    }
    redrawRef.current = false;
  }, [strokes, history]);
  var ctx = {
    canvasRef: canvasRef,
    startDrawing: startDrawing,
    endDrawing: endDrawing,
    draw: draw,
    currentStroke: currentStroke,
    strokes: strokes,
    setCurrentStroke: setCurrentStroke,
    setStrokes: setStrokes,
    history: history,
    undo: undo,
    redo: redo,
    jumpTo: jumpTo
  };
  return /*#__PURE__*/_jsx(CanvasRootProvider, _objectSpread(_objectSpread({}, ctx), {}, {
    children: children
  }));
}
function ToolBar() {
  var _useCanvasRoot2 = useCanvasRoot('Toolbar'),
    strokes = _useCanvasRoot2.strokes,
    history = _useCanvasRoot2.history,
    undo = _useCanvasRoot2.undo,
    redo = _useCanvasRoot2.redo,
    jumpTo = _useCanvasRoot2.jumpTo;
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: undo,
      disabled: history <= 0,
      children: "prev"
    }), /*#__PURE__*/_jsx("input", {
      type: "number",
      max: strokes.length,
      min: 1,
      onChange: function onChange(e) {
        return jumpTo(Number(e.target.value));
      },
      value: history + 1
    }), /*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: redo,
      disabled: history >= strokes.length - 1,
      children: "next"
    })]
  });
}
export { CanvasRoot, Canvas, ToolBar };