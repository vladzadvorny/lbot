const _ = require('lodash')

const send = require('./send')
const { photos } = require('./db')

module.exports = object => {
  const userId = object.user_id
  const index = _.findIndex(photos, { userId })

  if (
    object.attachments === undefined ||
    object.attachments.length > 1 ||
    object.attachments[0].type !== 'photo'
  ) {
    if (index === -1) {
      send({
        userId,
        body: `Перешли мне фото, на которое ты хочешь получить лайки.\n\n🍄ИНСТРУКЦИЯ:`,
        attachment: 'photo-140592989_456259264,photo-140592989_456259265'
      })
    } else {
      send({
        userId,
        body: `🍄 Твоё фото в очереди на ${index + 1} месте.`
      })
    }
  } else {
    if (index === -1) {
      const {
        attachments: [photo]
      } = object

      photos.push({
        userId,
        photo: `photo${photo.photo.owner_id}_${photo.photo.id}`
      })

      send({
        userId,
        body: `Фото добавлено!\nМесто в очереди: ${
          photos.length
        }\n\n🎀А теперь иди лайкать чужие фото на стене этого сообщества! Если бот не найдёт твоих лайков под чужими фото, то твоё не опубликует!🎀`
      })
    } else {
      send({
        userId,
        body: `🍄 Ты уже отправил фото и оно в очереди на ${index +
          1} месте.\nДождись, когда его опубликует бот, затем шли следующее. Чтобы ускорить процесс, иди лайкать чужие фото на стене этого сообщества! `
      })
    }
    console.log(photos)
  }
  // console.log(object)
}
