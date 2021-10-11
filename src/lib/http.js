const axios = require('axios') 

axios.defaults.headers.get['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.response.use(res => {
  return res.data;
})

async function getRepoList(token) {
  return axios.get(`https://gitee.com/api/v5/orgs/rubyliu-cli/repos?access_token=${token}`)
}

async function getTagList(token,repo) {
  return axios.get(`https://gitee.com/api/v5/repos/rubyliu-cli/${repo}/tags?access_token=${token}`)
}

async function getToken(username,password,client_id,client_secret) {
  return axios.post('https://gitee.com/oauth/token',{
    username,
    password,
    client_id,
    client_secret,
    scope: 'projects user_info',
    grant_type: 'password'
  })
}

module.exports = {
  getToken,
  getRepoList,
  getTagList
}