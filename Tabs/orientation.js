import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "./";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Demo() {
  return /*#__PURE__*/_jsxs(Tabs, {
    orientation: "vertical",
    children: [/*#__PURE__*/_jsxs(TabList, {
      children: [/*#__PURE__*/_jsx(Tab, {
        children: "One"
      }), /*#__PURE__*/_jsx(Tab, {
        children: "Two"
      }), /*#__PURE__*/_jsx(Tab, {
        children: "Three"
      })]
    }), /*#__PURE__*/_jsxs(TabPanels, {
      children: [/*#__PURE__*/_jsx(TabPanel, {
        children: /*#__PURE__*/_jsx("p", {
          children: "one!"
        })
      }), /*#__PURE__*/_jsx(TabPanel, {
        children: /*#__PURE__*/_jsx("p", {
          children: "two!"
        })
      }), /*#__PURE__*/_jsx(TabPanel, {
        children: /*#__PURE__*/_jsx("p", {
          children: "three!"
        })
      })]
    })]
  });
}
export default Demo;