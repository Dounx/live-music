import consumer from './consumer';
import flash from '../components/flash';

let player = null;
let needSync = false;

export default class RoomChannel {
  constructor(id, isOwner, ap) {
    player = ap;
    needSync = !isOwner;

    const channelMixin = {
      received: this.received,
    };

    this.channel = consumer.subscriptions.create(
        {channel: 'RoomsChannel', id: id}, channelMixin);
  }

  perform(...args) {
    this.channel.perform(...args);
  }

  broadcast(type, data = null) {
    this.channel.perform('broadcast', {type: type, data: data});
  }

  received(message) {
    const response = JSON.parse(message.data);
    const {type, data} = response;
    console.log(response);

    if (needSync) {
      switch (type) {
        case 'notice':
          flash('notice', data);
          break;
        case 'sync':
          if (player.list.index !== data.index) {
            player.list.switch(data.index);
          }

          if (Math.abs(player.audio.currentTime - data.time) > 3 ) {
            player.seek(data.time);
          }

          if (data.play) {
            player.play();
          } else {
            player.pause();
          }

          break;
        default:
          console.log(`Useless type: ${type}, data: ${data}`);
      }
    } else {
        switch (type) {
          case 'notice':
            flash('notice', data);
            break;
          case 'sync':
            break;
          default:
            console.log(`Useless type: ${type}, data: ${data}`);
      }
    }
  }
}
