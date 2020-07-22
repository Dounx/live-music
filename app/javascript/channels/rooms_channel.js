import consumer from './consumer'
import flash from '../components/flash'

export default class RoomChannel {
  constructor(id) {
    const channelMixin = {
      initialized() {
      },

      connected() {
        flash('notice', '已加入频道')
      },

      disconnected() {
        flash('notice', '已退出频道')
      },

      received(message) {
        console.log(message)
        let data = JSON.parse(message.data)
        console.log(data)
      }
    }

    this.channel = consumer.subscriptions.create({channel: "RoomsChannel", id: id}, channelMixin)
  }

  perform(...args) {
    this.channel.perform(...args)
  }

  broadcast(type, data = null) {
    this.channel.perform('broadcast', {type: type, data: data})
  }
}
