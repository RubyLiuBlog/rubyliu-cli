#!/usr/bin/env node
'use strict';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var _require = require('ini'),
    decode = _require.decode,
    encode = _require.encode;

var inquirer = require('inquirer');

var fs = require('fs-extra');

require('chalk');

var path = require('path');

var optionFilePath = path.resolve(__dirname, '../../constants.ini');
function isExist(_x) {
  return _isExist.apply(this, arguments);
}

function _isExist() {
  _isExist = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fs.exists(optionFilePath);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _isExist.apply(this, arguments);
}

function getOption(_x2) {
  return _getOption.apply(this, arguments);
}

function _getOption() {
  _getOption = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(key) {
    var ops;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return isExist();

          case 2:
            if (_context2.sent) {
              _context2.next = 4;
              break;
            }

            return _context2.abrupt("return", '');

          case 4:
            _context2.next = 6;
            return fs.readFile(optionFilePath, 'utf8');

          case 6:
            ops = _context2.sent;
            ops = decode(ops)[key];
            return _context2.abrupt("return", ops ? ops : '');

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getOption.apply(this, arguments);
}

function getAllOption() {
  return _getAllOption.apply(this, arguments);
}

function _getAllOption() {
  _getAllOption = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var ops;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return isExist();

          case 2:
            if (_context3.sent) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", {});

          case 4:
            _context3.next = 6;
            return fs.readFile(optionFilePath, 'utf8');

          case 6:
            ops = _context3.sent;
            ops = decode(ops);
            return _context3.abrupt("return", ops ? ops : {});

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getAllOption.apply(this, arguments);
}

function setOption(_x3, _x4) {
  return _setOption.apply(this, arguments);
}

function _setOption() {
  _setOption = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(key, value) {
    var ops;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            ops = {};
            _context4.next = 3;
            return isExist();

          case 3:
            if (!_context4.sent) {
              _context4.next = 11;
              break;
            }

            _context4.next = 6;
            return fs.readFile(optionFilePath, 'utf8');

          case 6:
            ops = _context4.sent;
            ops = decode(ops);
            Object.assign(ops, _defineProperty({}, key, value));
            _context4.next = 12;
            break;

          case 11:
            ops = _defineProperty({}, key, value);

          case 12:
            _context4.next = 14;
            return fs.writeFile(optionFilePath, encode(ops), 'utf8');

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _setOption.apply(this, arguments);
}

function removeOption(_x5) {
  return _removeOption.apply(this, arguments);
}

function _removeOption() {
  _removeOption = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(key) {
    var opts;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return isExist();

          case 2:
            if (_context5.sent) {
              _context5.next = 4;
              break;
            }

            return _context5.abrupt("return", '');

          case 4:
            _context5.next = 6;
            return fs.readFile(optionFilePath, 'utf8');

          case 6:
            opts = _context5.sent;
            opts = decode(opts);

            if (!opts[key]) {
              _context5.next = 12;
              break;
            }

            delete opts[key];
            _context5.next = 12;
            return fs.writeFile(optionFilePath, encode(opts), 'utf8');

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _removeOption.apply(this, arguments);
}

function validationOption() {
  return _validationOption.apply(this, arguments);
}

function _validationOption() {
  _validationOption = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
    var requiredList, opts, keys, missList, promptList, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return isExist();

          case 3:
            if (_context6.sent) {
              _context6.next = 6;
              break;
            }

            _context6.next = 6;
            return fs.createFile(optionFilePath, encode({}), 'utf8');

          case 6:
            requiredList = ['username', 'password', 'client_id', 'client_secret'];
            _context6.next = 9;
            return fs.readFile(optionFilePath, 'utf8');

          case 9:
            opts = _context6.sent;
            opts = decode(opts);
            keys = Object.keys(opts) || []; // 过滤出缺失的属性

            missList = requiredList.filter(function (item) {
              return keys.indexOf(item) < 0;
            }); // 如果有缺失

            if (!(missList.length > 0)) {
              _context6.next = 21;
              break;
            }

            promptList = missList.map(function (item) {
              return {
                type: 'input',
                name: item,
                message: "please input ".concat(item)
              };
            });
            _context6.next = 17;
            return inquirer.prompt(promptList);

          case 17:
            result = _context6.sent;
            // 合并属性
            Object.assign(opts, result);
            _context6.next = 21;
            return fs.writeFile(optionFilePath, encode(opts), 'utf8');

          case 21:
            return _context6.abrupt("return", true);

          case 24:
            _context6.prev = 24;
            _context6.t0 = _context6["catch"](0);
            console.error(_context6.t0);
            return _context6.abrupt("return", false);

          case 28:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 24]]);
  }));
  return _validationOption.apply(this, arguments);
}

function switchOption(_x6, _x7, _x8) {
  return _switchOption.apply(this, arguments);
}

function _switchOption() {
  _switchOption = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(action, key, value) {
    var _result, result;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.t0 = action;
            _context7.next = _context7.t0 === 'get' ? 3 : _context7.t0 === 'set' ? 8 : _context7.t0 === 'delete' ? 10 : _context7.t0 === 'list' ? 12 : 17;
            break;

          case 3:
            _context7.next = 5;
            return getOption(key);

          case 5:
            _result = _context7.sent;
            console.log(_result);
            return _context7.abrupt("break", 19);

          case 8:
            setOption(key, value);
            return _context7.abrupt("break", 19);

          case 10:
            removeOption(key);
            return _context7.abrupt("break", 19);

          case 12:
            _context7.next = 14;
            return getAllOption();

          case 14:
            result = _context7.sent;
            console.log(result);
            return _context7.abrupt("break", 19);

          case 17:
            console.log('please input rbuyliu config -h for help');
            return _context7.abrupt("break", 19);

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _switchOption.apply(this, arguments);
}

// #! /usr/bin/env node
var program = require('commander');
program // 定义命令和参数
.command('create <project-name>').description('create a new project') // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
.option('-f, --force', 'overwrite target directory if it exist').action( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, options) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return validationOption();

          case 2:
            if (!_context.sent) {
              _context.next = 6;
              break;
            }

            // 调用create 值
            require('../lib/create.js')(name, options);

            _context.next = 7;
            break;

          case 6:
            console.log('params error,plase try again');

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
program // 配置版本号信息
.version("v".concat(require('../../package.json').version)).usage('<command> [option]'); // 配置 config 命令

program.command('config [value]').description('inspect and modify the config').option('-g, --get <key>', 'get value from option').option('-s, --set <key> <value>').option('-d, --delete <key>', 'delete option from config').option('-l, --list', 'get all option').action(function (value, options) {
  var action = Object.keys(options)[0];
  var key = options[action];
  switchOption(action, key, value);
}); // 配置 ui 命令

program.command('ui').description('start add open rubyliu-cli ui').option('-p, --port <port>', 'Port used for the UI Server').action(function (option) {
  console.log(option);
}); // 配置彩票命令

program.command('lt').option('-w, --welfare <value>', 'Get welfare lottery number').option('-s, --sports <value>', 'Get sports lottery number').option('-a, --all <value>', 'Get All lottery number').description('get lottery tiket number').action(function (options) {
  var action = Object.keys(options)[0];
  var value = options[action];

  require('../lib/ticket/index')(action, value);
});
program // 监听 --help 执行
.on('--help', function () {
  // 使用 figlet 绘制 Logo
  console.log('\r\n' + require('figlet').textSync('RubyLiuCLI', {
    width: 100,
    whitespaceBreak: true
  })); // 新增说明信息

  console.log("\r\nRun ".concat(require('chalk').cyan("rubyliu <command> --help"), " show details\r\n"));
}); // 解析用户执行命令传入参数

program.parse(process.argv);
