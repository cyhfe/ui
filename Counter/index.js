function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React from 'react';
import { createContext } from "../createContext/index";
import { useControlledState } from "../useControlledState/index";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var _createContext = createContext('Counter'),
  _createContext2 = _slicedToArray(_createContext, 2),
  CounterProvider = _createContext2[0],
  useCounter = _createContext2[1];
function Counter(props) {
  var value = props.value,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? 0 : _props$defaultValue,
    _props$onChange = props.onChange,
    onChange = _props$onChange === void 0 ? function () {} : _props$onChange;
  var _useControlledState = useControlledState(value, defaultValue),
    _useControlledState2 = _slicedToArray(_useControlledState, 2),
    count = _useControlledState2[0],
    setCount = _useControlledState2[1];
  return /*#__PURE__*/_jsx(CounterProvider, {
    count: count,
    setCount: setCount,
    onChange: onChange,
    children: props.children
  });
}
function Trigger() {
  var ctx = useCounter('Trigger');
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: function onClick() {
        ctx.setCount(function (c) {
          return c + 1;
        });
        ctx.onChange(ctx.count + 1);
      },
      children: "+"
    }), /*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: function onClick() {
        ctx.setCount(function (c) {
          return c - 1;
        });
        ctx.onChange(ctx.count - 1);
      },
      children: "-"
    })]
  });
}
function Display() {
  var ctx = useCounter('Display');
  return /*#__PURE__*/_jsx("div", {
    children: ctx.count
  });
}
export { Counter, Trigger, Display };