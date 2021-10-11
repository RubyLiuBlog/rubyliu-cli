const inquirer = require ('inquirer')
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const clone = require('git-clone/promise');
const fs = require('fs-extra')
const { getToken, getRepoList,getTagList } = require('./http') 

/**
 * 加载动画
 * @param {Function} fn 方法
 * @param {string} message 信息
 * @param  {...any} args 方法的参数
 * @returns 
 */
async function wrapLoading(fn,message, ...args) {
  const spinner = ora(message);
  spinner.start()
  try {
    // 执行传入方法 fn
    const result = await fn(...args);
    // 状态为修改为成功
    spinner.succeed();
    return result; 
  } catch (error) {
    // 状态为修改为失败
    spinner.fail('Request failed')
    throw new Error(error)
  }
}

class Generator {
  constructor(name,targetDir){
    this.name = name;
    this.targetDir = targetDir;
    this.client_id = 'f85843aafad45d44fde5e598aa5b86168494ae2cfd9d2cf037fd56043aa1a10b';
    this.client_secret = 'ff8c7ff21e97088e40625dcff5ca5c595ee0b664e0c52d6b816a4ad4d0a9268a'
    this.token = ''
    this.username = ''
    this.password = ''
  }

  /**
   * 获取repoList
   * @returns repoList
   */
  async getRepo() {
    let result = ''
    const promptList = [{
      type: 'input',
      message: '请输入用户名',
      name: 'username',
      default: 'liulubingjava@163.com'
    },{
      type: 'password',
      message: '请输入密码',
      name: 'password',
      default: 'z123456'
    }]
    const {username,password} = await inquirer.prompt(promptList)
    try {
      // 1.拿token )
      const res = await wrapLoading(getToken,'获取token',username,password,this.client_id,this.client_secret)
      this.token = res.access_token

      this.username = username.replace('@','%40')
      this.password = password
    } catch (error) {
      console.log('token 请求出错-->',error)
    }
    try {
      // 2.拿仓库
      const repos = await wrapLoading(getRepoList,"获取仓库",this.token)
      // 3.转化成选项
      const repoList = repos.map((item,key) => {
        return {
          key: String(key),
          name: `${item.name} (${item.description})`,
          value: item.name
        }
      })
      const { repo } = await inquirer.prompt({
        name: 'repo',
        type: 'expand',
        choices: repoList,
        message: "请选择一个模版"
      })
      console.log('请选择一个模版---->',repo)
      result =  repo;
    } catch (error) {
      console.log('repoList 请求出错了-->',error)
    }
    return result
  }

  /**
   * 获取仓库的标签tag
   * @param {string} repo 仓库名称
   * @returns tag名
   */
  async getTag(repo) {
    const tags = await wrapLoading(getTagList,'获取标签',this.token,repo)
    if ( tags.length === 0 ){
      return ''
    }
    const tagList = tags.map(item => item.name)
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagList,
      message: "请选择一个标签"
    })
    return tag
  }

  /**
   * 下载git仓库
   * @param {string} repo 仓库名
   * @param {string} tag 标签
   */
  async downloadGitRepo(repo,tag){
    // 1.拼接下载地址
    const url = `https://${this.username}:${this.password}@gitee.com/rubyliu-cli/${repo}.git`
    // 2.下载仓库
    await wrapLoading(
      clone,
      'waiting download template',
      url,
      this.targetDir,
      { 
        shallow: true,  // 只获取最新版本
        args: tag ? ['--branch',tag] : []      // 指定要获取的标签
      }
    )
    // 3.移除.git文件夹
    await fs.remove(this.targetDir + '/.git')
  }

  /**
   * 创建
   */
  async create() {
    const repo = await this.getRepo()
    const tag = await this.getTag(repo)
    // 下载模版到目录
    try {
      await this.downloadGitRepo(repo,tag)
      console.log(`\r\n The  [${chalk.cyan(this.name)}] project created successfully `)
      console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    } catch (error) {
      console.log(`\r\n ${chalk.red('The')} [${chalk.cyan(this.name)}] ${chalk.red('project created Failed')} `)
      console.log(`\n ${chalk.red('-----------------------------------------error-log-start-------------------------')} `)
      console.log(error)
      console.log(`\n ${chalk.red('-----------------------------------------error-log-end-------------------------')} `)
    }
  }
}
module.exports = Generator;