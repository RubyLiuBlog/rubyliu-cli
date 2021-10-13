const path = require('path')
const fs = require('fs-extra')
const Generator = require('./generator')
const { validationOption } = require('../config/index')

module.exports = async function (name, options) {
  // 验证账号等信息是否存在
  const exist = await validationOption()
  if(!exist) {
    return;
  }
  // 当前命令行的目录
  const cwd = process.cwd();
  // 需要创建的目录地址
  const targetDir = path.join(cwd,name)
  // 目录是否已经存在
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      await fs.remove(targetDir)
    } else {
      // 询问用户是否确定要覆盖
      let { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },{
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (!action) {
        return;
      } else if (action === 'overwrite') {
        // 移除已存在的目录
        console.log(`\r\nRemoving...`)
        await fs.remove(targetDir)
      }
    }
  }
  // 创建项目
  const generator = new Generator(name,targetDir);
  generator.create()
}