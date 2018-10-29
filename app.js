const express = require('express')

const { PORT, CONFIRMATION } = require('./config')
const processing = require('./processing')

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

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
