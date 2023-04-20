function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var _excluded = ["children", "defaultIndex", "index", "onValueChange", "orientation", "keyboardActivation"],
  _excluded2 = ["children"];
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
import React, { useEffect, useLayoutEffect } from 'react';
import { createContext } from "../createContext";
import { useControlledState } from "../useControlledState";
import { createDescendantContext, DescendantProvider, useDescendant, useDescendants, useDescendantsInit } from "../useDescendants/index";
import { useStatefulRefValue } from "../useStatefulRefValue";
import { jsx as _jsx } from "react/jsx-runtime";
var TabsDescendantsContext = createDescendantContext('TabsDescendantsContext');
var TabPanelsDescendantsContext = createDescendantContext('TabPanels');
var _createContext = createContext('Tabs'),
  _createContext2 = _slicedToArray(_createContext, 2),
  TabsProvider = _createContext2[0],
  useTabs = _createContext2[1];
var Tabs = /*#__PURE__*/React.forwardRef(function Tabs(_ref, ref) {
  var children = _ref.children,
    defaultIndex = _ref.defaultIndex,
    index = _ref.index,
    onValueChange = _ref.onValueChange,
    _ref$orientation = _ref.orientation,
    orientation = _ref$orientation === void 0 ? 'horizontal' : _ref$orientation,
    _ref$keyboardActivati = _ref.keyboardActivation,
    keyboardActivation = _ref$keyboardActivati === void 0 ? 'auto' : _ref$keyboardActivati,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _React$useRef = React.useRef(index !== undefined),
    isControlled = _React$useRef.current;
  var _useDescendantsInit = useDescendantsInit(),
    _useDescendantsInit2 = _slicedToArray(_useDescendantsInit, 2),
    tabs = _useDescendantsInit2[0],
    setTabs = _useDescendantsInit2[1];
  var _React$useState = React.useState(-1),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focusIndex = _React$useState2[0],
    setFocusIndex = _React$useState2[1];
  var _useControlledState = useControlledState(index, defaultIndex !== null && defaultIndex !== void 0 ? defaultIndex : 0),
    _useControlledState2 = _slicedToArray(_useControlledState, 2),
    selectedIndex = _useControlledState2[0],
    setSelectedIndex = _useControlledState2[1];
  var onSelectTab = React.useCallback(function (index) {
    if (onValueChange) onValueChange(index);
    setSelectedIndex(index);
  }, [onValueChange, setSelectedIndex]);
  return /*#__PURE__*/_jsx(DescendantProvider, {
    Ctx: TabsDescendantsContext,
    items: tabs,
    set: setTabs,
    children: /*#__PURE__*/_jsx(TabsProvider, {
      isControlled: isControlled,
      selectedIndex: selectedIndex,
      setSelectedIndex: setSelectedIndex,
      onSelectTab: onSelectTab,
      orientation: orientation,
      focusIndex: focusIndex,
      setFocusIndex: setFocusIndex,
      keyboardActivation: keyboardActivation,
      children: /*#__PURE__*/_jsx("div", _objectSpread(_objectSpread({
        className: "tabs",
        css: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n            display: ", ";\n            p {\n              margin: 0;\n            }\n          "])), orientation === 'vertical' ? 'flex' : null),
        ref: ref
      }, rest), {}, {
        children: children
      }))
    })
  });
});
function TabList(_ref2) {
  var children = _ref2.children;
  var _useTabs = useTabs('TabList'),
    selectedIndex = _useTabs.selectedIndex,
    onSelectTab = _useTabs.onSelectTab,
    isControlled = _useTabs.isControlled,
    orientation = _useTabs.orientation,
    setFocusIndex = _useTabs.setFocusIndex,
    setSelectedIndex = _useTabs.setSelectedIndex,
    keyboardActivation = _useTabs.keyboardActivation,
    focusIndex = _useTabs.focusIndex;
  var tabs = useDescendants(TabsDescendantsContext);
  var handleKeyDown = function handleKeyDown(e) {
    var selectableTabs = tabs.filter(function (tab) {
      return !tab.disabled;
    });
    var index = keyboardActivation === 'auto' ? selectedIndex : focusIndex;
    if (!selectableTabs.length) return;
    var currentIndex = selectableTabs.findIndex(function (tab) {
      return tab.index === index;
    });
    switch (e.key) {
      case 'ArrowLeft':
        {
          if (orientation === 'horizontal') {
            var prev = currentIndex - 1 < 0 ? selectableTabs.length - 1 : currentIndex - 1;
            if (keyboardActivation === 'auto') {
              setFocusIndex(selectableTabs[prev].index);
              onSelectTab(selectableTabs[prev].index);
            } else {
              setFocusIndex(selectableTabs[prev].index);
            }
          }
          break;
        }
      case 'ArrowRight':
        {
          if (orientation === 'horizontal') {
            var next = currentIndex + 1 > selectableTabs.length - 1 ? 0 : currentIndex + 1;
            if (keyboardActivation === 'auto') {
              setFocusIndex(selectableTabs[next].index);
              onSelectTab(selectableTabs[next].index);
            } else {
              setFocusIndex(selectableTabs[next].index);
            }
          }
          break;
        }
      case 'ArrowUp':
        {
          if (orientation === 'vertical') {
            var _prev = currentIndex - 1 < 0 ? selectableTabs.length - 1 : currentIndex - 1;
            if (keyboardActivation === 'auto') {
              setFocusIndex(selectableTabs[_prev].index);
              onSelectTab(selectableTabs[_prev].index);
            } else {
              setFocusIndex(selectableTabs[_prev].index);
            }
          }
          break;
        }
      case 'ArrowDown':
        {
          if (orientation === 'vertical') {
            var _next = currentIndex + 1 > selectableTabs.length - 1 ? 0 : currentIndex + 1;
            if (keyboardActivation === 'auto') {
              setFocusIndex(selectableTabs[_next].index);
              onSelectTab(selectableTabs[_next].index);
            } else {
              setFocusIndex(selectableTabs[_next].index);
            }
          }
          break;
        }
      case ' ':
        {
          if (keyboardActivation === 'manual') {
            onSelectTab(focusIndex);
          }
          break;
        }
      case 'Enter':
        {
          if (keyboardActivation === 'manual') {
            onSelectTab(focusIndex);
          }
        }
    }
  };
  useLayoutEffect(function () {
    var _tabs$selectedIndex;
    if (!isControlled && (_tabs$selectedIndex = tabs[selectedIndex]) !== null && _tabs$selectedIndex !== void 0 && _tabs$selectedIndex.disabled) {
      var next = tabs.findIndex(function (tab) {
        return !tab.disabled;
      });
      setSelectedIndex(next);
    }
  }, [tabs, selectedIndex]);
  return /*#__PURE__*/_jsx("div", {
    className: "tab-list",
    onKeyDown: handleKeyDown,
    css: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        display: flex;\n        flex-direction: ", ";\n      "])), orientation === 'vertical' ? 'column' : null),
    children: children
  });
}
function Tab(_ref3) {
  var children = _ref3.children,
    disabled = _ref3.disabled;
  var ref = React.useRef(null);
  var _useStatefulRefValue = useStatefulRefValue(ref, null),
    _useStatefulRefValue2 = _slicedToArray(_useStatefulRefValue, 2),
    element = _useStatefulRefValue2[0],
    handleRefSet = _useStatefulRefValue2[1];
  var _useTabs2 = useTabs('Tab'),
    selectedIndex = _useTabs2.selectedIndex,
    setFocusIndex = _useTabs2.setFocusIndex,
    focusIndex = _useTabs2.focusIndex;
  var descendant = React.useMemo(function () {
    return {
      element: element,
      disabled: disabled !== null && disabled !== void 0 ? disabled : false
    };
  }, [element, disabled]);
  var index = useDescendant(descendant, TabsDescendantsContext);
  var isSelected = index === selectedIndex;
  var _useTabs3 = useTabs('Tab'),
    onSelectTab = _useTabs3.onSelectTab;
  useEffect(function () {
    var isFocus = focusIndex === index;
    if (isFocus) {
      var _ref$current;
      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.focus();
    }
  }, [focusIndex, index]);
  return /*#__PURE__*/_jsx("button", {
    type: "button",
    className: "tab",
    ref: handleRefSet,
    onClick: function onClick() {
      return onSelectTab(index);
    },
    onFocus: function onFocus() {
      return setFocusIndex(index);
    },
    onBlur: function onBlur() {
      return setFocusIndex(-1);
    },
    disabled: disabled,
    css: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n        padding: 0.25rem 0.5rem;\n        color: ", ";\n        background-color: ", ";\n        border: 1px solid ", ";\n      "])), isSelected ? '#1890ff' : null, isSelected ? '#fff' : null, isSelected ? '#1890ff' : '#d9d9d9'),
    children: children
  });
}
function TabPanels(_ref4) {
  var children = _ref4.children;
  var _useDescendantsInit3 = useDescendantsInit(),
    _useDescendantsInit4 = _slicedToArray(_useDescendantsInit3, 2),
    tabPanels = _useDescendantsInit4[0],
    setTabPanels = _useDescendantsInit4[1];
  return /*#__PURE__*/_jsx(DescendantProvider, {
    Ctx: TabPanelsDescendantsContext,
    items: tabPanels,
    set: setTabPanels,
    children: /*#__PURE__*/_jsx("div", {
      className: "tab-panels",
      css: css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n          padding: 0.25rem 0.75rem;\n        "]))),
      children: children
    })
  });
}
function TabPanel(_ref5) {
  var children = _ref5.children,
    rest = _objectWithoutProperties(_ref5, _excluded2);
  var ownRef = React.useRef(null);
  var _useStatefulRefValue3 = useStatefulRefValue(ownRef, null),
    _useStatefulRefValue4 = _slicedToArray(_useStatefulRefValue3, 2),
    element = _useStatefulRefValue4[0],
    handleRefSet = _useStatefulRefValue4[1];
  var descendant = React.useMemo(function () {
    return {
      element: element
    };
  }, [element]);
  var index = useDescendant(descendant, TabPanelsDescendantsContext);
  var _useTabs4 = useTabs('TabPanel'),
    selectedIndex = _useTabs4.selectedIndex;
  var hidden = index !== selectedIndex;
  return /*#__PURE__*/_jsx("div", _objectSpread(_objectSpread({
    ref: handleRefSet,
    hidden: hidden
  }, rest), {}, {
    children: children
  }));
}
export { Tabs, TabList, Tab, TabPanels, TabPanel };