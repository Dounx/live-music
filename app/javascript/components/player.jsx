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

  getCurrentId() {
    let index = this.getCurrentIndex();
    return this.ap.list.audios[index]['id'];
  }

  onInit = ap => {
    this.ap = ap;
    const {roomId, isOwner} = this.state;
    this.state.channel = new RoomChannel(roomId, isOwner, ap);
  };

  onPlay = () => {
    this.state.channel.broadcast('play');
  };

  onPause = () => {
    this.state.channel.broadcast('pause');
  };

  onLoadstart = () => {
    this.state.channel.broadcast('loaded', this.getCurrentId());
  };

  onSeeked = () => {
    let time = this.ap.audio.currentTime;
    this.state.channel.broadcast('seeked', time);
  };

  render() {
    const props = {
      listFolded: false,
      listMaxHeight: '90',
      audio: this.props.audio,
    };

    return (
        <div>
          {this.state.isLoading ? <Spinner/> : null}
          {
            this.state.isOwner ?
                <Aplayer
                    {...props}
                    onInit={this.onInit}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onLoadstart={this.onLoadstart}
                    onSeeked={this.onSeeked}
                /> :
                <Aplayer
                    {...props}
                    onInit={this.onInit}
                />
          }
        </div>
    );
  }
}