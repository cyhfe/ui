import { css } from '@emotion/react';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '.';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
var tabsStyle = css({
  width: 400,
  boxShadow: '1px 1px 5px hsla(0, 0%, 0%, 0.25)'
});
var tabListWrapperStyle = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid darkslategray',
  padding: '4px 0'
});
function Demo() {
  return /*#__PURE__*/_jsxs(Tabs, {
    css: tabsStyle,
    children: [/*#__PURE__*/_jsxs("div", {
      css: tabListWrapperStyle,
      children: [/*#__PURE__*/_jsxs(TabList, {
        style: {
          margin: '0 16px'
        },
        children: [/*#__PURE__*/_jsx(Tab, {
          children: "One"
        }), /*#__PURE__*/_jsx(Tab, {
          children: "Two"
        }), /*#__PURE__*/_jsx(Tab, {
          children: "Three"
        })]
      }), /*#__PURE__*/_jsx("div", {
        css: css({
          margin: '0 16px',
          textAlign: 'right'
        }),
        children: "Here is content styled alongside the tab list"
      })]
    }), /*#__PURE__*/_jsxs("div", {
      style: {
        background: 'ghostwhite',
        padding: '16px'
      },
      children: [/*#__PURE__*/_jsx("div", {
        style: {
          textAlign: 'center'
        },
        children: "Here is content above tab panels but styled with it."
      }), /*#__PURE__*/_jsxs(TabPanels, {
        children: [/*#__PURE__*/_jsxs(TabPanel, {
          children: [/*#__PURE__*/_jsx("h1", {
            children: "one!"
          }), /*#__PURE__*/_jsx("button", {
            type: "button",
            children: "yo"
          })]
        }), /*#__PURE__*/_jsx(TabPanel, {
          children: /*#__PURE__*/_jsx("h1", {
            children: "two!"
          })
        }), /*#__PURE__*/_jsx(TabPanel, {
          children: /*#__PURE__*/_jsx("h1", {
            children: "three!"
          })
        })]
      })]
    })]
  });
}
export default Demo;