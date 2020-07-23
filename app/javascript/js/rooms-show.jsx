import React from 'react';
import ReactDOM from 'react-dom';
import MusicAPI from '../components/music-api';
import Player from '../components/player';
import NeteaseLogin from '../components/netease-login';

class Room extends React.Component {
  constructor(props) {
    super(props);

    const {id, cookie} = localStorage;

    this.state = {
      roomId: this.props.roomId,
      playlistId: this.props.playlistId,
      isOwner: this.props.isOwner,
      api: new MusicAPI(id, cookie),
      playlist: {
        tracks: [],
      },
    };
  }

  async componentDidMount() {
    this.mounted = true;
    const {api, playlistId, channel} = this.state;
    let playlist = await api.getPlaylist(playlistId);
    if (this.mounted) {
      this.setState({
        playlist: playlist,
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const audio = this.state.playlist.tracks;
    const {isOwner, roomId} = this.state;

    return (
        <Player
            audio={audio}
            isOwner={isOwner}
            roomId={roomId}
        />
    );
  }
}

document.addEventListener('turbolinks:load', () => {
  if (document.getElementById('rooms-show')) {
    const node = document.getElementById('playlist-id');
    const playlistId = node.getAttribute('value');
    const cookie = localStorage.getItem('cookie');
    const roomId = parseInt(
        document.getElementById('room-id').getAttribute('value'));
    const isOwner = document.getElementById('is-owner').
        getAttribute('value') === 'true';

    if (cookie) {
      ReactDOM.render(
          <Room
              playlistId={playlistId}
              roomId={roomId}
              isOwner={isOwner}
          />,
          document.getElementById('root'),
      );
    } else {
      ReactDOM.render(
          <NeteaseLogin/>,
          document.getElementById('root'),
      );
    }
  }
});