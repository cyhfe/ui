var _templateObject, _templateObject2;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { css, keyframes } from '@emotion/react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "./";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var fadeIn = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
function FadeInTabPanel(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_jsx(TabPanel, {
    css: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n        animation: ", " 1.5s linear;\n      "])), fadeIn),
    children: children
  });
}
function Demo() {
  return /*#__PURE__*/_jsxs(Tabs, {
    children: [/*#__PURE__*/_jsxs(TabList, {
      children: [/*#__PURE__*/_jsx(Tab, {
        children: "One"
      }), /*#__PURE__*/_jsx(Tab, {
        children: "Two"
      }), /*#__PURE__*/_jsx(Tab, {
        children: "Three"
      })]
    }), /*#__PURE__*/_jsxs(TabPanels, {
      children: [/*#__PURE__*/_jsx(FadeInTabPanel, {
        children: /*#__PURE__*/_jsx("p", {
          children: "one!"
        })
      }), /*#__PURE__*/_jsx(FadeInTabPanel, {
        children: /*#__PURE__*/_jsx("p", {
          children: "two!"
        })
      }), /*#__PURE__*/_jsx(FadeInTabPanel, {
        children: /*#__PURE__*/_jsx("p", {
          children: "three!"
        })
      })]
    })]
  });
}
export default Demo;