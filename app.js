const express = require('express')
const api = require('vk-easy')

const {
  PORT,
  CONFIRMATION,
  PUBLIC_ID,
  USER_TOKEN,
  INTERVAL
} = require('./config')
const processing = require('./processing')
const { photos } = require('./db')

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send('Hello World!'))
app.post('/', (req, res) => {
  try {
    const { body } = req

    switch (body.type) {
      case 'confirmation':
        res.send(CONFIRMATION)
        return
        break

      case 'message_new':
        processing(body.object)
        break

      default:
        break
    }
  } catch (error) {
    console.log(error)
  }

  res.send('ok')
})

setInterval(async () => {
  const chunk = photos.splice(0, 5)

  if (chunk.length > 0) {
    const attachments = chunk.map(item => item.photo).join(',')
    await api('wall.post', {
      owner_id: PUBLIC_ID,
      message: '💕🍄🎀',
      attachments,
      access_token: USER_TOKEN
    })
  }
}, 1000 * 60 * INTERVAL)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
