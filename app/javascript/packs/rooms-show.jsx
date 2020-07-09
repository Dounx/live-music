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

        const cookie = localStorage.getItem('cookie')
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
        const data = await api.loginByPhone(phone, password)
        const cookie = data.cookie

        if (cookie) {
            localStorage.setItem('cookie', cookie)
            location.reload()
        }
    }

    render() {
        return (
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div>
                        <h2>网易云账号登陆</h2>
                    </div>
                    <form onSubmit={this.onSubmit}>
                        <input autoFocus autoComplete="username" placeholder="手机号" className="styled-input"/>
                        <input type="password" autoComplete="current-password" placeholder="密码" className="styled-input" />
                        <div className="actions">
                            <input type="submit" name="commit" value="登陆" data-disable-with="登陆" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
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
            <Login />,
            document.getElementById('root')
        )
    }
})