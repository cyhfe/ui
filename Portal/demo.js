var _templateObject;
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
import { css } from '@emotion/react';
import React from 'react';
import Portal from "./index";
import { jsx as _jsx } from "react/jsx-runtime";
var style = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: red;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n"])));
function Demo() {
  return /*#__PURE__*/_jsx(Portal, {
    css: style,
    children: "portal"
  });
}
export default Demo;