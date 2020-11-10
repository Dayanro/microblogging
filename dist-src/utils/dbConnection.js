"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoDisconnect = exports.mongoConnection = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("dotenv").config({
  path: require("find-config")(".env")
});

var _process$env = process.env,
    PROTOCOL = _process$env.PROTOCOL,
    DB_USERNAME = _process$env.DB_USERNAME,
    DB_PASSWORD = _process$env.DB_PASSWORD,
    DB_HOSTNAME = _process$env.DB_HOSTNAME,
    DB_NAME = _process$env.DB_NAME;
var databaseUrl = "".concat(PROTOCOL, "//").concat(DB_USERNAME, ":").concat(DB_PASSWORD, "@").concat(DB_HOSTNAME, "/").concat(DB_NAME);

var mongoConnection = _mongoose["default"].connect(databaseUrl, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});

exports.mongoConnection = mongoConnection;

var mongoDisconnect = function mongoDisconnect() {
  return _mongoose["default"].connection.close();
};

exports.mongoDisconnect = mongoDisconnect;