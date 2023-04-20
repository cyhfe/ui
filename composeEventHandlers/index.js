function composeEventHandlers(theirHandler, ourHandler) {
  return function (event) {
    theirHandler && theirHandler(event);
    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
}
export { composeEventHandlers };