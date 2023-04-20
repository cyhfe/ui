var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Dialog } from "./index";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Demo() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isAnotherOpen = _useState4[0],
    setIsAnotherOpen = _useState4[1];
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsx("button", {
      type: "button",
      onClick: function onClick() {
        return setIsOpen(true);
      },
      children: "open"
    }), /*#__PURE__*/_jsxs(Dialog, {
      isOpen: isOpen,
      onDismiss: function onDismiss() {
        setIsOpen(false);
      },
      children: [/*#__PURE__*/_jsx("div", {
        css: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n            width: 100px;\n            height: 100px;\n          "]))),
        children: "hello dialog"
      }), /*#__PURE__*/_jsxs("div", {
        children: [/*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: function onClick() {
            return setIsOpen(false);
          },
          children: "close"
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          onClick: function onClick() {
            return setIsAnotherOpen(true);
          },
          children: "open another"
        })]
      }), /*#__PURE__*/_jsxs(Dialog, {
        isOpen: isAnotherOpen,
        onDismiss: function onDismiss() {
          setIsAnotherOpen(false);
        },
        children: [/*#__PURE__*/_jsx("div", {
          children: "hello dialog"
        }), /*#__PURE__*/_jsx("div", {
          children: /*#__PURE__*/_jsx("button", {
            type: "button",
            onClick: function onClick() {
              return setIsAnotherOpen(false);
            },
            children: "close another"
          })
        })]
      })]
    })]
  });
}
export default Demo;