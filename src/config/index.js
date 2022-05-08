const { decode, encode} = require('ini')
const inquirer = require ('inquirer')
const fs = require('fs-extra')
const chalk = require('chalk')
const path = require('path')
const optionFilePath = path.resolve(__dirname,'../../constants.ini')

export async function isExist(params) {
  return await fs.exists(optionFilePath)
}

export async function getOption(key) {
  if (! await isExist()) {
    return ''
  }
  let ops = await fs.readFile(optionFilePath,'utf8')
  ops = decode(ops)[key]
  return ops ? ops : ''
}

export async function getAllOption() {
  if (! await isExist()) {
    return {}
  }
  let ops = await fs.readFile(optionFilePath,'utf8')
  ops = decode(ops)
  return ops ? ops : {}
}

export async function setOption(key,value) {
  let ops = {}
  if (await isExist()) {
    ops = await fs.readFile(optionFilePath,'utf8')
    ops = decode(ops)
    Object.assign(ops, { [key]: value });
  }
  else {
    ops = {[key]: value}
  }
  await fs.writeFile(optionFilePath,encode(ops), 'utf8')
}

export async function removeOption(key) {
  if (! await isExist()) {
    return ''
  }
  let opts = await fs.readFile(optionFilePath, 'utf8');
  opts = decode(opts);
  if (opts[key]){
    delete opts[key];
    await fs.writeFile(optionFilePath, encode(opts), 'utf8');
  }
}

export async function validationOption() {
  try {
    if(! await isExist()) {
      await fs.createFile(optionFilePath,encode({}),'utf8')
    }
    const requiredList = ['username','password','client_id','client_secret']
    let opts = await fs.readFile(optionFilePath, 'utf8');
    opts = decode(opts);
    const keys = Object.keys(opts) || []
    // 过滤出缺失的属性
    let missList = requiredList.filter(item => keys.indexOf(item) < 0)
    // 如果有缺失
    if (missList.length > 0) {
      const promptList =  missList.map(item => (
        {
          type: 'input',
          name: item,
          message: `please input ${item}`
        }
      ))
      const result = await inquirer.prompt(promptList)
      // 合并属性
      Object.assign(opts,result)
      await fs.writeFile(optionFilePath, encode(opts), 'utf8');
    }
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function switchOption(action,key,value) {
  switch (action) {
    case 'get': {
      let result = await getOption(key);
      console.log(result);
      break;
    }
    case 'set': 
      setOption(key,value);
      break;
    case 'delete':
      removeOption(key);
      break;
    case 'list':
      let result = await getAllOption();
      console.log(result);
      break;
    default:
      console.log('please input rbuyliu config -h for help');
      break;
  }
}