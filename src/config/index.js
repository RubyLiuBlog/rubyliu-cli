const { decode, encode} = require('ini')
const inquirer = require ('inquirer')
const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
const optionFilePath = path.resolve(__dirname,'constants.js')

async function getOption(key) {
  let ops = await fs.readFile(optionFilePath,'utf8')
  ops = decode(tmp)[key]
  return ops ? ops : ''
}

async function getAllOption() {
  let ops = await fs.readFile(optionFilePath,'utf8')
  ops = decode(ops)
  return ops ? ops : {}
}

async function setOption(key,value) {
  let ops = await fs.readFile(optionFilePath,'utf8')
  ops = decode(ops)
  Object.assign(ops, { [key]: value });
  await fs.writeFile(optionFilePath,encode(ops, 'utf8'))
}

async function removeOption(key) {
  let opts = await fs.readFile(optionFilePath, 'utf8');
  opts = decode(opts);
  if (opts[key]){
    delete opts[key];
    await fs.writeFile(optionFilePath, encode(opts), 'utf8');
  }
}

async function validationOption() {
  try {
    const requiredList = ['username','password','client_id','client_secret']
    let opts = await fs.readFile(optionFilePath, 'utf8');
    opts = decode(opts);
    const keys = Object.keys(opts) || []
    console.log('1keys---->',keys)
    // 过滤出缺失的属性
    let missList = requiredList.filter(item => keys.indexOf(item) === -1)
    console.log('2.missList',missList)
    const promptList =  missList.map(item => (
      {
        type: 'input',
        name: item,
        message: `please input ${item}`
      }
    ))
    console.log('3.promptList',promptList)
    const result = await inquirer.prompt(promptList)
    // 合并属性
    Object.assign(opts,result)
    await fs.writeFile(optionFilePath, encode(opts), 'utf8');
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
module.exports = {
  getOption,
  setOption,
  removeOption,
  getAllOption,
  validationOption
}