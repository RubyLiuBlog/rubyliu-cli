const inquirer = require ('inquirer')
const { getToken, getRepoList,getTagList } = require('./http') 
const ora = require('ora')
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
    spinner.fail('Request failed, refetch ...')
  }
}

class Generator {
  constructor(name,targetDir){
    this.name = name;
    this.targetDir = targetDir;
    this.client_id = 'f85843aafad45d44fde5e598aa5b86168494ae2cfd9d2cf037fd56043aa1a10b';
    this.client_secret = 'ff8c7ff21e97088e40625dcff5ca5c595ee0b664e0c52d6b816a4ad4d0a9268a'
    this.token = ''
  }

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

  async getTag(repo) {
    const tags = await wrapLoading(getTagList,'获取标签',this.token,repo)
    const tagList = tags.map(item => item.name)
    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagList,
      message: "请选择一个标签"
    })
    return tag
  }
  async create() {
    const repo = await this.getRepo()
    const tag = await this.getTag(repo)
    console.log(`用户选择了repo:${repo},tag: ${tag}`)

  }
}
module.exports = Generator;