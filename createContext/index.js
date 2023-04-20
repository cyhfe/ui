var _excluded = ["children"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import { jsx as _jsx } from "react/jsx-runtime";
function createContext(rootComponentName, defaultContextValue) {
  var Ctx = /*#__PURE__*/React.createContext(defaultContextValue);
  function Provider(props) {
    var children = props.children,
      context = _objectWithoutProperties(props, _excluded);
    var deps = Object.values(context);
    var value = React.useMemo(function () {
      return context;
    }, deps);
    return /*#__PURE__*/_jsx(Ctx.Provider, {
      value: value,
      children: children
    });
  }
  function useContext(callerComponentName) {
    var context = React.useContext(Ctx);
    if (context) return context;
    if (defaultContextValue) return defaultContextValue;
    throw Error("".concat(callerComponentName, " must be rendered inside of a ").concat(rootComponentName, " component."));
  }
  Ctx.displayName = "".concat(rootComponentName, "Context");
  Provider.displayName = "".concat(rootComponentName, "Provider");
  return [Provider, useContext];
}
export { createContext };