// #! /usr/bin/env node
const program = require('commander');
const { switchOption, validationOption } = require('../config/index.js');

program
  // 定义命令和参数
  .command('create <project-name>')
  .description('create a new project')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', 'overwrite target directory if it exist')
  .action(async (name, options) => {

    // 验证账号
    if (await validationOption()){
      // 调用create 值
      require('../lib/create.js')(name,options)
    }else{
      console.log('params error,plase try again')
    }
  })
  
program
   // 配置版本号信息
  .version(`v${require('../../package.json').version}`)
  .usage('<command> [option]')

// 配置 config 命令
program
  .command('config [value]')
  .description('inspect and modify the config')
  .option('-g, --get <key>', 'get value from option')
  .option('-s, --set <key> <value>')
  .option('-d, --delete <key>', 'delete option from config')
  .option('-l, --list', 'get all option')
  .action((value, options) => {
    const action = Object.keys(options)[0]
    const key = options[action]
    switchOption(action,key,value)
  })

// 配置 ui 命令
program
  .command('ui')
  .description('start add open rubyliu-cli ui')
  .option('-p, --port <port>', 'Port used for the UI Server')
  .action((option) => {
    console.log(option)
  })

// 配置彩票命令
program
  .command('lt')
  .option('-w, --welfare <value>', 'Get welfare lottery number')
  .option('-s, --sports <value>', 'Get sports lottery number')
  .option('-a, --all <value>', 'Get All lottery number')
  .description('get lottery tiket number')
  .action((options) => {
    const action = Object.keys(options)[0]
    const value = options[action]
    require('../lib/ticket/index')(action,value)
  })

program
// 监听 --help 执行
.on('--help', () => {
  // 使用 figlet 绘制 Logo
  console.log('\r\n' + require('figlet').textSync('RubyLiuCLI', {
    width: 100,
    whitespaceBreak: true
  }));
  // 新增说明信息
  console.log(`\r\nRun ${require('chalk').cyan(`rubyliu <command> --help`)} show details\r\n`)
})


// 解析用户执行命令传入参数
program.parse(process.argv);
