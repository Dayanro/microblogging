#!/usr/bin/env node
"use strict";

require("core-js/stable");

require("regenerator-runtime/runtime");

var _app = _interopRequireDefault(require("../app"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 3000;

var server = _http["default"].createServer(_app["default"]);

server.on('error', function (error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      logger.error("Port ".concat(PORT, " requires elevated privileges"));
      process.exit(1);
      break;

    case 'EADDRINUSE':
      logger.error("Port ".concat(PORT, " is already in use"));
      process.exit(1);
      break;

    default:
      throw error;
  }
});
server.listen(PORT, function () {
  logger.info("Server running and listening on port:".concat(PORT));
});