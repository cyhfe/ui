function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9;
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { css } from '@emotion/react';
import React from 'react';
import { createContext } from "../createContext";
import Portal from "../Portal";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var DEFAULT_DURATION = 3000;
var ToastID = 0;
var _createContext = createContext('Toast'),
  _createContext2 = _slicedToArray(_createContext, 2),
  ToastProvider = _createContext2[0],
  useToast = _createContext2[1];
var Timer = /*#__PURE__*/function () {
  function Timer(handler, delay) {
    _classCallCheck(this, Timer);
    _defineProperty(this, "handler", void 0);
    _defineProperty(this, "delay", void 0);
    _defineProperty(this, "timerId", null);
    _defineProperty(this, "remaining", void 0);
    _defineProperty(this, "startTime", void 0);
    this.handler = handler;
    this.delay = delay;
    this.remaining = delay;
  }
  _createClass(Timer, [{
    key: "start",
    value: function start() {
      this.startTime = Date.now();
      this.timerId = setTimeout(this.handler, this.delay);
    }
  }, {
    key: "pause",
    value: function pause() {
      if (!this.timerId || !this.startTime) return;
      this.remaining = this.remaining - (Date.now() - this.startTime);
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }, {
    key: "resume",
    value: function resume() {
      this.startTime = Date.now();
      this.timerId = setTimeout(this.handler, this.remaining);
    }
  }, {
    key: "clear",
    value: function clear() {
      if (!this.timerId) return;
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }]);
  return Timer;
}();
function ToastItem(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'info' : _ref$type,
    message = _ref.message,
    onExpire = _ref.onExpire,
    duration = _ref.duration,
    onRemove = _ref.onRemove,
    autoClose = _ref.autoClose,
    node = _ref.node;
  var timerRef = React.useRef(new Timer(onExpire, duration));
  React.useEffect(function () {
    autoClose && timerRef.current.start();
    return function () {
      autoClose && timerRef.current.clear();
    };
  }, [autoClose]);
  var colorByType = type === 'success' ? '#52c41a' : type === 'error' ? '#ff4d4f' : '#1677ff';
  return /*#__PURE__*/_jsxs("div", {
    css: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        padding: 14px;\n        margin-bottom: 12px;\n        background-color: #ffffff;\n        display: flex;\n        justify-content: space-between;\n        border-left: 14px solid ", ";\n        border-radius: 6px;\n        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.12);\n        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);\n        :hover {\n          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2),\n            0 5px 5px rgba(0, 0, 0, 0.17);\n        }\n      "])), colorByType),
    onMouseEnter: function onMouseEnter() {
      autoClose && timerRef.current.pause();
    },
    onMouseLeave: function onMouseLeave() {
      autoClose && timerRef.current.resume();
    },
    children: [message && message, node && node, /*#__PURE__*/_jsx("svg", {
      onClick: onRemove,
      width: "10",
      height: "10",
      viewBox: "0 0 12 12",
      css: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n          cursor: pointer;\n          fill: #bfbfbf;\n          transition: all 0.2s ease-in-out;\n          :hover {\n            width: 12px;\n            height: 12px;\n            fill: #434343;\n          }\n        "]))),
      children: /*#__PURE__*/_jsx("path", {
        d: "M7.17495 5.99999L10.7583 2.42499C10.9152 2.26807 11.0034 2.05524 11.0034 1.83333C11.0034 1.61141 10.9152 1.39858 10.7583 1.24166C10.6014 1.08474 10.3885 0.996582 10.1666 0.996582C9.9447 0.996582 9.73187 1.08474 9.57495 1.24166L5.99995 4.82499L2.42495 1.24166C2.26803 1.08474 2.0552 0.996582 1.83328 0.996582C1.61136 0.996582 1.39854 1.08474 1.24162 1.24166C1.0847 1.39858 0.996539 1.61141 0.996539 1.83333C0.996539 2.05524 1.0847 2.26807 1.24162 2.42499L4.82495 5.99999L1.24162 9.57499C1.16351 9.65246 1.10151 9.74463 1.05921 9.84618C1.0169 9.94773 0.995117 10.0566 0.995117 10.1667C0.995117 10.2767 1.0169 10.3856 1.05921 10.4871C1.10151 10.5887 1.16351 10.6809 1.24162 10.7583C1.31908 10.8364 1.41125 10.8984 1.5128 10.9407C1.61435 10.983 1.72327 11.0048 1.83328 11.0048C1.94329 11.0048 2.05221 10.983 2.15376 10.9407C2.25531 10.8984 2.34748 10.8364 2.42495 10.7583L5.99995 7.17499L9.57495 10.7583C9.65242 10.8364 9.74459 10.8984 9.84614 10.9407C9.94768 10.983 10.0566 11.0048 10.1666 11.0048C10.2766 11.0048 10.3855 10.983 10.4871 10.9407C10.5886 10.8984 10.6808 10.8364 10.7583 10.7583C10.8364 10.6809 10.8984 10.5887 10.9407 10.4871C10.983 10.3856 11.0048 10.2767 11.0048 10.1667C11.0048 10.0566 10.983 9.94773 10.9407 9.84618C10.8984 9.74463 10.8364 9.65246 10.7583 9.57499L7.17495 5.99999Z"
      })
    })]
  });
}
function ToastContainer() {
  var _useToast = useToast('ToastContainer'),
    queue = _useToast.queue,
    duration = _useToast.duration,
    remove = _useToast.remove,
    defaultAutoClose = _useToast.autoClose,
    position = _useToast.position;
  var baseStyle = css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    position: fixed;\n    width: 200px;\n    z-index: 999;\n  "])));
  var positionStyle = {
    'top-left': css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n      top: 16px;\n      left: 16px;\n    "]))),
    'top-right': css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n      top: 16px;\n      right: 16px;\n    "]))),
    'top-center': css(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n      top: 16px;\n      left: 50%;\n      transform: translateX(-50%);\n    "]))),
    'bottom-left': css(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n      bottom: 16px;\n      left: 16px;\n    "]))),
    'bottom-right': css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n      bottom: 16px;\n      right: 16px;\n    "]))),
    'bottom-center': css(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n      bottom: 16px;\n      left: 50%;\n      transform: translateX(-50%);\n    "])))
  };
  return /*#__PURE__*/_jsx(Portal, {
    className: "toastContainer",
    css: [baseStyle, positionStyle[position]],
    children: queue.map(function (_ref2) {
      var type = _ref2.type,
        message = _ref2.message,
        id = _ref2.id,
        _ref2$autoClose = _ref2.autoClose,
        autoClose = _ref2$autoClose === void 0 ? defaultAutoClose : _ref2$autoClose,
        node = _ref2.node;
      return /*#__PURE__*/_jsx(ToastItem, {
        type: type,
        message: message,
        duration: duration,
        onExpire: function onExpire() {
          return remove(id);
        },
        onRemove: function onRemove() {
          return remove(id);
        },
        autoClose: autoClose,
        node: node
      }, id);
    })
  });
}
function ToastRoot(_ref3) {
  var children = _ref3.children,
    max = _ref3.max,
    _ref3$duration = _ref3.duration,
    duration = _ref3$duration === void 0 ? DEFAULT_DURATION : _ref3$duration,
    _ref3$autoClose = _ref3.autoClose,
    autoClose = _ref3$autoClose === void 0 ? false : _ref3$autoClose,
    _ref3$position = _ref3.position,
    position = _ref3$position === void 0 ? 'top-right' : _ref3$position;
  var _React$useState = React.useState([]),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    queue = _React$useState2[0],
    setQueue = _React$useState2[1];
  var add = function add(toast) {
    if (max && queue.length >= max) return;
    var toastWithId = _objectSpread(_objectSpread({}, toast), {}, {
      id: ToastID++
    });
    setQueue(function (queue) {
      return [].concat(_toConsumableArray(queue), [toastWithId]);
    });
  };
  var remove = function remove(id) {
    setQueue(function (queue) {
      return _toConsumableArray(queue.filter(function (toast) {
        return toast.id !== id;
      }));
    });
  };
  return /*#__PURE__*/_jsxs(ToastProvider, {
    duration: duration,
    enqueueToast: add,
    remove: remove,
    queue: queue,
    setQueue: setQueue,
    autoClose: autoClose,
    position: position,
    children: [children, /*#__PURE__*/_jsx(ToastContainer, {})]
  });
}
export { ToastContainer, ToastItem, ToastRoot, useToast };