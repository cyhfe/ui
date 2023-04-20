import React from 'react';
import { Counter, Display, Trigger } from '.';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function Demo() {
  return /*#__PURE__*/_jsxs(Counter, {
    defaultValue: 2,
    onChange: function onChange(c) {
      return console.log(c);
    },
    children: [/*#__PURE__*/_jsx(Display, {}), /*#__PURE__*/_jsx(Trigger, {})]
  });
}
export default Demo;