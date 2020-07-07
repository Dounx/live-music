import React from 'react'
import ReactDOM from 'react-dom'
import ReactAplayer from 'react-aplayer'
import MusicAPI from './music-api'

class Player extends React.Component {
    componentDidUpdate(prevProps) {
        if (this.props.audio !== prevProps.audio) {
            this.audioChange(this.props.audio)
        }
    }

    audioChange(audio) {
        this.ap.list.clear()
        this.ap.list.add(audio)
    }

    onInit = ap => {
        this.ap = ap
    }

    onPlay = () => {
        console.log('on play')
    }

    onPause = () => {
        console.log('on pause')
    }

    onSeeked = () => {
        console.log('on seeked')
    }

    onVolumechange = () => {
        console.log('on volumechange')
    }

    render() {
        const props = {
            listFolded: false,
            listMaxHeight: '90',
            audio: this.props.audio
        };

        return (
            <div>
                <ReactAplayer
                    {...props}
                    onInit={this.onInit}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                    onSeeked={this.onSeeked}
                    onVolumechange={this.onVolumechange}
                />
            </div>
        )
    }
}

class Room extends React.Component {
    constructor(props) {
        super(props);

        const cookie = localStorage.getItem('neteaseCloudMusicCookie')
        console.log(cookie)
        this.state = {
            playlistId: this.props.playlistId,
            api: new MusicAPI(cookie),
            playlist: {
                tracks: []
            }
        }
    }

    async componentDidMount() {
        const { api, playlistId } = this.state

        let playlist = await api.getPlaylist(playlistId)

        this.setState({playlist: playlist})
    }

    render() {
        return (
            <Player audio={this.state.playlist.tracks} />
        )
    }
}

class Login extends React.Component {
    async onSubmit(event) {
        event.preventDefault()
        const phone = event.target[0].value
        const password = event.target[1].value
        const api = new MusicAPI()
        const cookie = await api.loginByPhone(phone, password)

        if (cookie) {
            localStorage.setItem('neteaseCloudMusicCookie', cookie)
            location.reload()
        }
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input />
                <input type="password" />
                <button>Submit</button>
            </form>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const node = document.getElementById('playlist-id')
    const playlistId = node.getAttribute('value')
    const cookie = localStorage.getItem('neteaseCloudMusicCookie')

    if (cookie) {
        ReactDOM.render(
            <Room playlistId={playlistId} />,
            document.getElementById('root')
        )
    } else {
        ReactDOM.render(
            <Login />,
            document.getElementById('root')
        )
    }
})