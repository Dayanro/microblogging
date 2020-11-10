"use strict";

var _dbConnection = require("../utils/dbConnection");

var _user = require("../models/user");

require("core-js/stable");

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require("dotenv").config({
  path: require("find-config")(".env")
});

var user = [{
  username: "Admin",
  password: "Admin123"
}, {
  username: "User",
  password: "User123"
}];

var createUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var db;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _dbConnection.mongoConnection;

          case 3:
            db = _context.sent;

            _user.UserModel.collection.drop();

            _context.next = 7;
            return _user.UserModel.create(user);

          case 7:
            _context.next = 12;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            console.error({
              error: _context.t0
            });

          case 12:
            _context.prev = 12;
            (0, _dbConnection.mongoDisconnect)();
            return _context.finish(12);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9, 12, 15]]);
  }));

  return function createUsers() {
    return _ref.apply(this, arguments);
  };
}();

createUsers();