function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _excluded = ["element", "index"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useCallback, useLayoutEffect } from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
function useForceUpdate() {
  var _React$useState = React.useState(Object.create(null)),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    setState = _React$useState2[1];
  return useCallback(function () {
    setState(Object.create(null));
  }, []);
}
function insertAt(array, item, index) {
  if (index === undefined || !(index in array)) {
    return [].concat(_toConsumableArray(array), [item]);
  }
  return [].concat(_toConsumableArray(array.slice(0, index)), [item], _toConsumableArray(array.slice(index)));
}
function createDescendantContext(name) {
  var initialValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var descendants = [];
  var Ctx = /*#__PURE__*/React.createContext(_objectSpread({
    descendants: descendants,
    registerDescendant: function registerDescendant() {}
  }, initialValue));
  Ctx.displayName = name;
  return Ctx;
}
function useDescendants(Ctx) {
  return React.useContext(Ctx).descendants;
}
function DescendantProvider(_ref) {
  var Ctx = _ref.Ctx,
    children = _ref.children,
    items = _ref.items,
    set = _ref.set;
  var registerDescendant = React.useCallback(function (_ref2) {
    var element = _ref2.element,
      explicitIndex = _ref2.index,
      rest = _objectWithoutProperties(_ref2, _excluded);
    if (!element) return;
    set(function (items) {
      if (explicitIndex !== undefined && explicitIndex !== -1) {
        return insertAt(items, _objectSpread({
          element: element,
          index: explicitIndex
        }, rest), explicitIndex);
      }
      if (items.length === 0) {
        return [_objectSpread(_objectSpread({}, rest), {}, {
          element: element,
          index: 0
        })];
      }
      var index = items.findIndex(function (item) {
        if (!item.element) return false;
        // element是否在item.element之前
        return Boolean(item.element.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_PRECEDING);
      });
      var newItems;
      if (index === -1) {
        newItems = [].concat(_toConsumableArray(items), [_objectSpread(_objectSpread({}, rest), {}, {
          element: element,
          index: items.length
        })]);
      } else {
        newItems = insertAt(items, _objectSpread(_objectSpread({}, rest), {}, {
          element: element,
          index: index
        }), index);
      }
      return newItems;
    });
    return function unRegisterDescendant() {
      if (!element) return;
      set(function (items) {
        return items.filter(function (item) {
          return item.element !== element;
        });
      });
    };
  }, []);
  var value = React.useMemo(function () {
    return {
      descendants: items,
      registerDescendant: registerDescendant
    };
  }, [items, registerDescendant]);
  return /*#__PURE__*/_jsx(Ctx.Provider, {
    value: value,
    children: children
  });
}
function useDescendant(descendant, Ctx, indexProp) {
  var _React$useContext = React.useContext(Ctx),
    registerDescendant = _React$useContext.registerDescendant,
    descendants = _React$useContext.descendants;
  var forceUpdate = useForceUpdate();
  var index = indexProp !== null && indexProp !== void 0 ? indexProp : descendants.findIndex(function (item) {
    return item.element === descendant.element;
  });
  useLayoutEffect(function () {
    // 初次渲染时，ref为null
    if (!descendant.element) forceUpdate();
    return registerDescendant(_objectSpread(_objectSpread({}, descendant), {}, {
      index: index
    }));
  }, [descendant, forceUpdate, index, registerDescendant].concat(_toConsumableArray(Object.values(descendant))));
  return index;
}
function useDescendantsInit() {
  return React.useState([]);
}
export { createDescendantContext, useDescendants, DescendantProvider, useDescendant, useDescendantsInit };