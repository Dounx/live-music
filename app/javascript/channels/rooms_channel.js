import consumer from './consumer'
import flash from '../components/flash'

export default function createRoomsChannel(player) {
  const roomId = parseInt(document.getElementById("room-id").getAttribute("value"))
  const isOwner = (document.getElementById("is-owner").getAttribute("value") === "true")
  const channelMixin = {
    initialized() {
      this.sync = this.sync.bind(this)
    },

    received(data) {
      data = JSON.parse(data)
      switch (data["action"]) {
        case "sync":
          if (isOwner) {
            break
          }

          if (getCurrentIndex() !== data["index"]) {
            player.list.switch(data["index"])
          }

          if (player.audio.paused !== data["paused"]) {
            if (data["paused"] === true) {
              player.pause()
            } else {
              player.play()
            }
          }

          let time = getCurrentTime()
          if (Math.abs(time - data["time"]) > 3) {
            player.seek(data["time"])
          }

          break;
        case "notice":
          flash("notice", data["msg"], 3000)
          setUserCounter(data["user_counter"])
          break
        default:
          console.log(data)
      }
    }
  }
  consumer.subscriptions.create({channel: "RoomsChannel", id: roomId}, channelMixin)
}
