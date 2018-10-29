const api = require('vk-easy')

const { COMMUNITY_TOKEN } = require('./config')

const execute = []

module.exports = ({ userId, body, attachment }) => {
  execute.push({
    user_id: userId,
    message: body,
    attachment: attachment || ''
  })
}

setInterval(() => {
  if (execute.length) {
    const chunk = execute.splice(0, 25)
    const method = []

    chunk.forEach(msg => {
      method.push(`API.messages.send(${JSON.stringify(msg)})`)
    })

    api('execute', {
      code: `return [${method.join(',')}];`,
      access_token: COMMUNITY_TOKEN
    }).catch(global.console.log)
  }
}, 335)
