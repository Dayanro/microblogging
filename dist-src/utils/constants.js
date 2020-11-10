"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SALT = exports.PASSWORD_PATTERN = void 0;
// Patterns
var PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/; // Encrypt

exports.PASSWORD_PATTERN = PASSWORD_PATTERN;
var SALT = 10;
exports.SALT = SALT;