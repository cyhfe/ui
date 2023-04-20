var _templateObject, _templateObject2;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { css } from '@emotion/react';
import React from 'react';
import { ToastRoot, useToast } from "./index";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Node() {
  return /*#__PURE__*/_jsx("div", {
    children: "node"
  });
}
function Example() {
  var _useToast = useToast('Example'),
    enqueueToast = _useToast.enqueueToast;
  return /*#__PURE__*/_jsxs("div", {
    className: "Example",
    css: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        display: flex;\n        gap: 12px;\n      "]))),
    children: [/*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: function onClick() {
        return enqueueToast({
          type: 'info',
          message: 'info message'
        });
      },
      children: "Add info toast"
    }), /*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: function onClick() {
        return enqueueToast({
          type: 'error',
          message: 'error message'
        });
      },
      children: "Add error toast"
    }), /*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: function onClick() {
        return enqueueToast({
          type: 'success',
          message: 'success message'
        });
      },
      children: "Add success toast"
    }), /*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: function onClick() {
        return enqueueToast({
          type: 'info',
          node: /*#__PURE__*/_jsx(Node, {})
        });
      },
      children: "Add info toast"
    })]
  });
}
function App() {
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    autoClose = _React$useState2[0],
    setAutoClose = _React$useState2[1];
  var _React$useState3 = React.useState(undefined),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    max = _React$useState4[0],
    setMax = _React$useState4[1];
  var _React$useState5 = React.useState(3000),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    duration = _React$useState6[0],
    setDuration = _React$useState6[1];
  var _React$useState7 = React.useState('top-right'),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    position = _React$useState8[0],
    setPosition = _React$useState8[1];
  return /*#__PURE__*/_jsxs(ToastRoot, {
    position: position,
    autoClose: autoClose,
    duration: duration,
    max: max === undefined ? max : Number(max),
    children: [/*#__PURE__*/_jsxs("div", {
      css: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n          display: flex;\n          gap: 18px;\n          margin-bottom: 20px;\n        "]))),
      children: [/*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          htmlFor: "autoClose",
          children: "autoClose: "
        }), /*#__PURE__*/_jsx("input", {
          type: "checkbox",
          onChange: function onChange(e) {
            return setAutoClose(e.target.checked);
          },
          id: "autoClose"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          htmlFor: "duration",
          children: "duration: "
        }), /*#__PURE__*/_jsx("input", {
          type: "number",
          defaultValue: duration,
          onChange: function onChange(e) {
            return setDuration(Number(e.target.value));
          },
          id: "duration"
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          htmlFor: "position",
          children: "position: "
        }), /*#__PURE__*/_jsxs("select", {
          name: "position",
          id: "position",
          value: position,
          onChange: function onChange(e) {
            return setPosition(e.target.value);
          },
          children: [/*#__PURE__*/_jsx("option", {
            value: "top-left",
            children: "TOP-LEFT"
          }), /*#__PURE__*/_jsx("option", {
            value: "top-center",
            children: "TOP-CENTER"
          }), /*#__PURE__*/_jsx("option", {
            value: "top-right",
            children: "TOP-RIGHT"
          }), /*#__PURE__*/_jsx("option", {
            value: "bottom-left",
            children: "BOTTOM-LEFT"
          }), /*#__PURE__*/_jsx("option", {
            value: "bottom-center",
            children: "BOTTOM-CENTER"
          }), /*#__PURE__*/_jsx("option", {
            value: "bottom-right",
            children: "BOTTOM-RIGHT"
          })]
        })]
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("label", {
          htmlFor: "max",
          children: "max: "
        }), /*#__PURE__*/_jsx("input", {
          type: "number",
          onChange: function onChange(e) {
            return setMax(e.target.value);
          }
        })]
      })]
    }), /*#__PURE__*/_jsx(Example, {})]
  });
}
export default App;