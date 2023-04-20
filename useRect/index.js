function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import React, { useLayoutEffect, useRef, useState } from 'react';
var props = ['bottom', 'height', 'left', 'right', 'top', 'width'];
var rectChanged = function rectChanged() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return props.some(function (prop) {
    return a[prop] !== b[prop];
  });
};
var observedNodes = new Map();
var rafId;
var run = function run() {
  var changedStates = [];
  observedNodes.forEach(function (state, node) {
    var newRect = node.getBoundingClientRect();
    if (rectChanged(state.rect, newRect)) {
      state.rect = newRect;
      changedStates.push(state);
    }
  });
  changedStates.forEach(function (state) {
    state.callbacks.forEach(function (cb) {
      return cb(state.rect);
    });
  });
  rafId = requestAnimationFrame(run);
};
export function observeRect(node, cb) {
  return {
    observe: function observe() {
      var wasEmpty = observedNodes.size === 0;
      if (observedNodes.has(node)) {
        observedNodes.get(node).callbacks.push(cb);
      } else {
        observedNodes.set(node, {
          rect: undefined,
          hasRectChanged: false,
          callbacks: [cb]
        });
      }
      if (wasEmpty) run();
    },
    unobserve: function unobserve() {
      var state = observedNodes.get(node);
      if (state) {
        var index = state.callbacks.indexOf(cb);
        if (index >= 0) state.callbacks.splice(index, 1);
        if (!state.callbacks.length) observedNodes.delete(node);
        if (!observedNodes.size) cancelAnimationFrame(rafId);
      }
    }
  };
}
var useRect = function useRect(nodeRef) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onChange = options.onChange,
    observe = options.observe;
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    rect = _useState2[0],
    setRect = _useState2[1];
  var _useState3 = useState(nodeRef.current),
    _useState4 = _slicedToArray(_useState3, 2),
    element = _useState4[0],
    setElement = _useState4[1];
  var initialRectIsSet = useRef(false);
  var initialRefIsSet = useRef(false);
  var onChangeRef = React.useRef(onChange);
  useLayoutEffect(function () {
    onChangeRef.current = onChange;
    if (nodeRef.current !== element) {
      setElement(nodeRef.current);
    }
  });
  useLayoutEffect(function () {
    if (element && !initialRectIsSet.current) {
      initialRectIsSet.current = true;
      setRect(element.getBoundingClientRect());
    }
  }, [element]);
  useLayoutEffect(function () {
    if (!observe) return;
    var elem = element;
    if (!initialRefIsSet.current) {
      initialRefIsSet.current = true;
      elem = nodeRef.current;
    }
    if (!elem) return;
    var observer = observeRect(elem, function (rect) {
      setRect(rect);
      onChange === null || onChange === void 0 ? void 0 : onChange(rect);
    });
    observer.observe();
    return function () {
      observer.unobserve();
    };
  }, [observe, element, nodeRef]);
  return rect;
};
export { useRect };