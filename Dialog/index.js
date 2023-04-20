function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _templateObject, _templateObject2;
var _excluded = ["isOpen", "onDismiss", "children"],
  _excluded2 = ["children", "isOpen", "onDismiss"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { css } from '@emotion/react';
import React, { useRef } from 'react';
import { createContext } from "../createContext";
import Portal from "../Portal";
import { jsx as _jsx } from "react/jsx-runtime";
function noop() {}
var _createContext = createContext('DialogContext'),
  _createContext2 = _slicedToArray(_createContext, 1),
  DialogContextProvider = _createContext2[0];
function DialogWrapper(_ref) {
  var _ref$isOpen = _ref.isOpen,
    isOpen = _ref$isOpen === void 0 ? true : _ref$isOpen,
    _ref$onDismiss = _ref.onDismiss,
    onDismiss = _ref$onDismiss === void 0 ? noop : _ref$onDismiss,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_jsx(Portal, _objectSpread(_objectSpread({
    onKeyDown: function onKeyDown(e) {
      e.stopPropagation();
      if (e.key === 'Escape') {
        onDismiss();
      }
    },
    onClick: function onClick(e) {
      e.stopPropagation();
      onDismiss();
    },
    css: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        position: fixed;\n        left: 0;\n        right: 0;\n        top: 0;\n        bottom: 0;\n        background-color: hsla(0, 0%, 0%, 0.33);\n        z-index: 99;\n      "])))
  }, props), {}, {
    children: /*#__PURE__*/_jsx(DialogContextProvider, {
      isOpen: isOpen,
      onDismiss: onDismiss,
      children: children
    })
  }));
}
function DialogOverlay(_ref2) {
  var children = _ref2.children,
    isOpen = _ref2.isOpen,
    onDismiss = _ref2.onDismiss,
    props = _objectWithoutProperties(_ref2, _excluded2);
  return isOpen ? /*#__PURE__*/_jsx(DialogWrapper, _objectSpread(_objectSpread({
    isOpen: isOpen,
    onDismiss: onDismiss
  }, props), {}, {
    children: children
  })) : null;
}
function DialogContent(_ref3) {
  var children = _ref3.children;
  var contentRef = useRef(null);
  return /*#__PURE__*/_jsx("div", {
    ref: contentRef,
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    css: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        width: 50vw;\n        margin: 10vh auto;\n        background: white;\n        padding: 2rem;\n        outline: none;\n      "]))),
    children: children
  });
}
function Dialog(_ref4) {
  var children = _ref4.children,
    _ref4$isOpen = _ref4.isOpen,
    isOpen = _ref4$isOpen === void 0 ? false : _ref4$isOpen,
    _ref4$onDismiss = _ref4.onDismiss,
    onDismiss = _ref4$onDismiss === void 0 ? noop : _ref4$onDismiss;
  return /*#__PURE__*/_jsx(DialogOverlay, {
    isOpen: isOpen,
    onDismiss: onDismiss,
    children: /*#__PURE__*/_jsx(DialogContent, {
      children: children
    })
  });
}
export { DialogWrapper, DialogOverlay, DialogContent, Dialog };