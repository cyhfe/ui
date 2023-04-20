import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "./index";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var DataTabs = function DataTabs(_ref) {
  var data = _ref.data;
  return /*#__PURE__*/_jsxs(Tabs, {
    children: [/*#__PURE__*/_jsx(TabList, {
      children: data.map(function (_ref2) {
        var label = _ref2.label,
          id = _ref2.id;
        return /*#__PURE__*/_jsx(Tab, {
          children: label
        }, id);
      })
    }), /*#__PURE__*/_jsx(TabPanels, {
      children: data.map(function (_ref3) {
        var content = _ref3.content,
          id = _ref3.id;
        return /*#__PURE__*/_jsx(TabPanel, {
          children: content
        }, id);
      })
    })]
  });
};
function Example() {
  var tabData = [{
    id: 1,
    label: 'Taco',
    content: 'Perhaps the greatest dish ever invented.'
  }, {
    id: 2,
    label: 'Burrito',
    content: 'Perhaps the greatest dish ever invented but bigger and with rice.'
  }];
  return /*#__PURE__*/_jsx(DataTabs, {
    data: tabData
  });
}
export default Example;