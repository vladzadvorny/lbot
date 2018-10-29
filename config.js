const dotenv = require('dotenv')
const path = require('path')

const root = path.join.bind(this, __dirname)
dotenv.config({ path: root('.env') })

module.exports = {
  PORT: process.env.PORT || 3000,
  USER_TOKEN: process.env.USER_TOKEN,
  COMMUNITY_TOKEN: process.env.COMMUNITY_TOKEN,
  CONFIRMATION: process.env.CONFIRMATION
}
