var _transitions, _transitions2, _transitions3, _transitions4, _transitions5, _states, _templateObject, _templateObject2, _templateObject3;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { createMachine } from '@cyhfe/state-machine/dist/index';
import { css } from '@emotion/react';
import React, { useEffect, useRef, useState } from 'react';
import Portal from "../Portal";
import { useRect } from "../useRect";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
var GlobalTooltipId = null;
var genID = 0;
var MOUSE_REST_TIMEOUT = 100;
var LEAVE_TIMEOUT = 300;
var TooltipStates;
(function (TooltipStates) {
  TooltipStates["Idle"] = "IDLE";
  TooltipStates["Focused"] = "FOCUSED";
  TooltipStates["Visible"] = "VISIBLE";
  TooltipStates["LeavingVisible"] = "LEAVING_VISIBLE";
  TooltipStates["Dismissed"] = "DISMISSED";
})(TooltipStates || (TooltipStates = {}));
var TooltipEvents;
(function (TooltipEvents) {
  TooltipEvents["Blur"] = "BLUR";
  TooltipEvents["Focus"] = "FOCUS";
  TooltipEvents["MouseDown"] = "MOUSE_DOWN";
  TooltipEvents["MouseEnter"] = "MOUSE_ENTER";
  TooltipEvents["MouseLeave"] = "MOUSE_LEAVE";
  TooltipEvents["MouseMove"] = "MOUSE_MOVE";
  TooltipEvents["Rest"] = "REST";
  TooltipEvents["TimeComplete"] = "TIME_COMPLETE";
})(TooltipEvents || (TooltipEvents = {}));
var restTimeout;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var send = function send(_event) {};
function startRestTimer() {
  window.clearTimeout(restTimeout);
  restTimeout = window.setTimeout(function () {
    send(TooltipEvents.Rest);
  }, MOUSE_REST_TIMEOUT);
}
function clearRestTimer() {
  window.clearTimeout(restTimeout);
}
var leavingVisibleTimer;
function startLeavingVisibleTimer() {
  window.clearTimeout(leavingVisibleTimer);
  leavingVisibleTimer = window.setTimeout(function () {
    return send(TooltipEvents.TimeComplete);
  }, LEAVE_TIMEOUT);
}
function clearLeavingVisibleTimer() {
  window.clearTimeout(leavingVisibleTimer);
}
var chart = {
  initialState: TooltipStates.Idle,
  states: (_states = {}, _defineProperty(_states, TooltipStates.Idle, {
    actions: {},
    transitions: (_transitions = {}, _defineProperty(_transitions, TooltipEvents.MouseEnter, {
      target: TooltipStates.Focused
    }), _defineProperty(_transitions, TooltipEvents.Focus, {
      target: TooltipStates.Visible
    }), _transitions)
  }), _defineProperty(_states, TooltipStates.Focused, {
    actions: {
      onEnter: startRestTimer,
      onExit: clearRestTimer
    },
    transitions: (_transitions2 = {}, _defineProperty(_transitions2, TooltipEvents.MouseMove, {
      target: TooltipStates.Focused
    }), _defineProperty(_transitions2, TooltipEvents.MouseLeave, {
      target: TooltipStates.Idle
    }), _defineProperty(_transitions2, TooltipEvents.MouseDown, {
      target: TooltipStates.Dismissed
    }), _defineProperty(_transitions2, TooltipEvents.Blur, {
      target: TooltipStates.Idle
    }), _defineProperty(_transitions2, TooltipEvents.Rest, {
      target: TooltipStates.Visible
    }), _transitions2)
  }), _defineProperty(_states, TooltipStates.Visible, {
    transitions: (_transitions3 = {}, _defineProperty(_transitions3, TooltipEvents.Focus, {
      target: TooltipStates.Focused
    }), _defineProperty(_transitions3, TooltipEvents.MouseEnter, {
      target: TooltipStates.Focused
    }), _defineProperty(_transitions3, TooltipEvents.MouseLeave, {
      target: TooltipStates.LeavingVisible
    }), _defineProperty(_transitions3, TooltipEvents.Blur, {
      target: TooltipStates.LeavingVisible
    }), _defineProperty(_transitions3, TooltipEvents.MouseDown, {
      target: TooltipStates.Dismissed
    }), _transitions3)
  }), _defineProperty(_states, TooltipStates.LeavingVisible, {
    actions: {
      onEnter: startLeavingVisibleTimer,
      onExit: function onExit() {
        clearLeavingVisibleTimer();
      }
    },
    transitions: (_transitions4 = {}, _defineProperty(_transitions4, TooltipEvents.MouseEnter, {
      target: TooltipStates.Visible
    }), _defineProperty(_transitions4, TooltipEvents.Focus, {
      target: TooltipStates.Visible
    }), _defineProperty(_transitions4, TooltipEvents.TimeComplete, {
      target: TooltipStates.Idle
    }), _transitions4)
  }), _defineProperty(_states, TooltipStates.Dismissed, {
    actions: {
      onEnter: startLeavingVisibleTimer
    },
    transitions: (_transitions5 = {}, _defineProperty(_transitions5, TooltipEvents.MouseLeave, {
      target: TooltipStates.Idle
    }), _defineProperty(_transitions5, TooltipEvents.Blur, {
      target: TooltipStates.Idle
    }), _transitions5)
  }), _states)
};
var machine = createMachine(chart);
send = machine.send.bind(machine);
function useId() {
  var _useState = useState(function () {
      return genID++;
    }),
    _useState2 = _slicedToArray(_useState, 1),
    id = _useState2[0];
  return id;
}
function TooltipPopup(_ref) {
  var label = _ref.label,
    triggerRef = _ref.triggerRef,
    isVisible = _ref.isVisible;
  var ownRef = useRef(null);
  var ownRect = useRect(ownRef);
  var triggerRect = useRect(triggerRef);
  function getPosition() {
    if (!ownRect || !triggerRect) return {
      top: 0,
      left: 0
    };
    var top = triggerRect.bottom + 12;
    var left = triggerRect.left + triggerRect.width / 2 - ownRect.width / 2;
    return {
      top: top,
      left: left
    };
  }
  var position = getPosition();
  return isVisible ? /*#__PURE__*/_jsx(Portal, {
    ref: ownRef,
    css: css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n        position: absolute;\n        top: ", "px;\n        left: ", "px;\n      "])), position.top, position.left),
    onScroll: function onScroll() {
      console.log('scroll');
    },
    children: /*#__PURE__*/_jsxs("div", {
      css: css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n          padding: 0.5rem;\n          /* border: 1px solid #40a9ff; */\n          background: #40a9ff;\n          border-radius: 8px;\n          color: #fff;\n        "]))),
      children: [/*#__PURE__*/_jsx("div", {
        css: css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            width: 0px;\n            height: 0px;\n            position: absolute;\n            top: -8px;\n            left: 50%;\n            transform: translateX(-50%);\n            width: 0;\n            border-left: 8px solid transparent;\n            border-right: 8px solid transparent;\n            border-bottom: 8px solid #40a9ff;\n          "])))
      }), label]
    })
  }) : null;
}
function isTooltipVisible(id) {
  if (id !== GlobalTooltipId) return false;
  return machine.state === TooltipStates.Visible || machine.state === TooltipStates.LeavingVisible;
}
function Tooltip(_ref2) {
  var children = _ref2.children,
    label = _ref2.label;
  var id = useId();
  var onMouseDown = function onMouseDown() {
    GlobalTooltipId = id;
    send(TooltipEvents.MouseDown);
  };
  var onBlur = function onBlur() {
    GlobalTooltipId = null;
    send(TooltipEvents.Blur);
  };
  var onFocus = function onFocus() {
    GlobalTooltipId = id;
    send(TooltipEvents.Focus);
  };
  var onMouseEnter = function onMouseEnter() {
    GlobalTooltipId = id;
    send(TooltipEvents.MouseEnter);
  };
  var onMouseLeave = function onMouseLeave() {
    send(TooltipEvents.MouseLeave);
  };
  var onMouseMove = function onMouseMove() {
    GlobalTooltipId = id;
    send(TooltipEvents.MouseMove);
  };
  var trigger = {
    onMouseDown: onMouseDown,
    onBlur: onBlur,
    onFocus: onFocus,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave,
    onMouseMove: onMouseMove
  };
  var triggerRef = useRef(null);
  var child = React.Children.only(children);
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isVisible = _useState4[0],
    setIsVisible = _useState4[1];
  useEffect(function () {
    return machine.subscribe(function () {
      setIsVisible(isTooltipVisible(id));
    });
  }, [id]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/React.cloneElement(child, _objectSpread({
      ref: triggerRef
    }, trigger)), /*#__PURE__*/_jsx(TooltipPopup, {
      label: label,
      triggerRef: triggerRef,
      isVisible: isVisible
    })]
  });
}
export { Tooltip, machine };