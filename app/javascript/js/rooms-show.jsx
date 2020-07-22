import React from 'react'
import ReactDOM from 'react-dom'
import MusicAPI from '../components/music-api'
import Player from '../components/player'
import NeteaseLogin from '../components/netease-login'
import RoomChannel from '../channels/rooms_channel'

class Room extends React.Component {
    constructor(props) {
        super(props)

        const { id, cookie } = localStorage

        this.state = {
            playlistId: this.props.playlistId,
            api: new MusicAPI(id, cookie),
            playlist: {
                tracks: []
            },
            channel: new RoomChannel(this.props.roomId)
        }
    }

    async componentDidMount() {
        this.mounted = true
        const { api, playlistId, channel } = this.state
        let playlist = await api.getPlaylist(playlistId)
        if(this.mounted) {
            this.setState({
                playlist: playlist
            })
        }
        channel.broadcast('ping', 'hello')
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        return (
            <Player audio={this.state.playlist.tracks} channel={this.state.channel} />
        )
    }
}

document.addEventListener('turbolinks:load', () => {
    if (document.getElementById('rooms-show')) {
        const node = document.getElementById('playlist-id')
        const playlistId = node.getAttribute('value')
        const cookie = localStorage.getItem('cookie')
        const roomId = parseInt(document.getElementById("room-id").getAttribute("value"))

        if (cookie) {
            ReactDOM.render(
                <Room playlistId={playlistId} roomId={roomId} />,
                document.getElementById('root')
            )
        } else {
            ReactDOM.render(
                <NeteaseLogin />,
                document.getElementById('root')
            )
        }
    }
})