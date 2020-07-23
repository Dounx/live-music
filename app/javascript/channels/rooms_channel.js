import consumer from './consumer'
import flash from '../components/flash'

let player = null
let needSync = false

export default class RoomChannel {
  constructor(id, isOwner, ap) {
    player = ap
    needSync = !isOwner

    const channelMixin = {
      received: this.received
    }

    this.channel = consumer.subscriptions.create({channel: 'RoomsChannel', id: id}, channelMixin)
  }

  broadcast(type, data = null) {
    this.channel.perform('broadcast', {type: type, data: data})
  }

  received(message) {
    if (needSync) {
      const response = JSON.parse(message.data)
      const {type, data} = response
      console.log(response)

      switch(type) {
        case 'play':
          player.play()
          break
        case 'pause':
          player.pause()
          break
        case 'loaded':
          player.list.switch(data)
          break
        case 'seeked':
          player.seek(data)
          break
        case 'notice':
          flash('notice', data)
          break
        default:
          console.log(`Unsupported type: ${type}, data: ${data}`)
      }
    }
  }
}
