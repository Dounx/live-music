import consumer from './consumer'
import flash from '../components/flash'

export default class RoomChannel {
  constructor(id) {
    const channelMixin = {
      initialized() {
      },

      connected() {
        flash('notice', '已加入频道')
        setInterval(this.sync, 1000)
      },

      disconnected() {
        flash('notice', '已退出频道')
      },

      received(data) {
        data = JSON.parse(data)
        console.log(data)
      }
    }

    this.channel = consumer.subscriptions.create({channel: "RoomsChannel", id: id}, channelMixin)
  }

  send(...args) {
    this.channel.send(...args)
  }
}
