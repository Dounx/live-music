import React from 'react'
import ReactDOM from 'react-dom'
import MusicAPI from '../components/music-api'
import Player from '../components/player'
import NeteaseLogin from '../components/netease-login'

class Room extends React.Component {
    constructor(props) {
        super(props)

        const { id, cookie } = localStorage

        this.state = {
            playlistId: this.props.playlistId,
            api: new MusicAPI(id, cookie),
            playlist: {
                tracks: []
            }
        }
    }

    async componentDidMount() {
        const { api, playlistId } = this.state

        let playlist = await api.getPlaylist(playlistId)

        this.setState({
            playlist: playlist
        })
    }

    render() {
        return (
            <Player audio={this.state.playlist.tracks} />
        )
    }
}



document.addEventListener('turbolinks:load', () => {
    const node = document.getElementById('playlist-id')
    const playlistId = node.getAttribute('value')
    const cookie = localStorage.getItem('cookie')

    if (cookie) {
        ReactDOM.render(
            <Room playlistId={playlistId} />,
            document.getElementById('root')
        )
    } else {
        ReactDOM.render(
            <NeteaseLogin />,
            document.getElementById('root')
        )
    }
})