import React from 'react';
import Aplayer from 'react-aplayer';
import Spinner from '../components/spinner';
import RoomChannel from '../channels/rooms_channel';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      roomId: this.props.roomId,
      isOwner: this.props.isOwner,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.audio !== prevProps.audio) {
      this.audioChange(this.props.audio);
      this.removeLoading();
    }
  }

  audioChange(audio) {
    this.ap.list.clear();
    this.ap.list.add(audio);
  }

  removeLoading() {
    if (this.state.isLoading) {
      this.setState({isLoading: false});
    }
  }

  getCurrentIndex() {
    return this.ap.list.index;
  }

  sync() {
    const data = {
      play: !this.ap.audio.paused,
      time: this.ap.audio.currentTime,
      index: this.getCurrentIndex()
    };
    this.state.channel.broadcast('sync', data);
  }

  onInit = ap => {
    this.ap = ap;
    const {roomId, isOwner} = this.state;
    this.state.channel = new RoomChannel(roomId, isOwner, ap);

    if (this.state.isOwner) {
      setInterval(this.sync.bind(this), 1000);
    }
  };

  render() {
    const props = {
      autoPlay: true,
      listFolded: false,
      listMaxHeight: '90',
      audio: this.props.audio,
    };

    return (
        <div>
          {this.state.isLoading ? <Spinner/> : null}
          <Aplayer
              {...props}
              onInit={this.onInit}
          />
        </div>
    );
  }
}