function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React from 'react';
import { useRect } from '.';
import { jsxs as _jsxs } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
export default function Example() {
  var _React$useState = React.useState(true),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    observe = _React$useState2[0],
    setObserve = _React$useState2[1];
  // your own ref
  var ref = React.useRef(null);

  // pass it in to be observered
  var rect = useRect(ref, {
    observe: observe
  });
  return /*#__PURE__*/_jsxs("div", {
    children: [/*#__PURE__*/_jsxs("button", {
      type: "button",
      onClick: function onClick() {
        return setObserve(!observe);
      },
      children: [observe ? 'Stop' : 'Start', " observing"]
    }), /*#__PURE__*/_jsx("pre", {
      children: JSON.stringify(rect, null, 2)
    }), /*#__PURE__*/_jsx("div", {
      // and then place the ref
      ref: ref,
      contentEditable: true,
      style: {
        display: 'inline-block',
        padding: 10,
        border: 'solid 1px'
      },
      dangerouslySetInnerHTML: {
        __html: 'Edit this to change the size!'
      }
    })]
  });
}