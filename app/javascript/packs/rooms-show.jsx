import React from 'react'
import ReactDOM from 'react-dom'
import ReactAplayer from 'react-aplayer'
import MusicAPI from './music-api'

import 'antd/dist/antd.css'

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
        this.state = {
            playlist: {
                tracks: []
            }
        }
    }

    async componentDidMount() {
        let mapi = new MusicAPI()
        await mapi.loginByPhone(1234567890, '1234567890')
        let playlistId = await mapi.getPlaylistId(1)
        let playlist = await mapi.getPlaylist(playlistId)

        this.setState({playlist: playlist})
    }

    render() {
        return (
            <Player audio={this.state.playlist.tracks} />
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Room />,
        document.getElementById('root')
    )
})