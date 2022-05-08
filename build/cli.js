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

// #! /usr/bin/env node
var program = require('commander');

var _require = require('../config/index.js'),
    switchOption = _require.switchOption,
    validationOption = _require.validationOption;

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
