import React from 'react'
import ReactDOM from 'react-dom'
import ReactAplayer from 'react-aplayer'

import 'antd/dist/antd.css'

class Player extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount(){
        fetch('http://127.0.0.1:3000/rooms/1',{
            method:'GET',
            headers:{
                'Content-Type':'application/json;charset=UTF-8'
            },
            mode:'cors',
            cache:'default'
        })
            .then(res =>res.json())
            .then((data) => {
                console.log(data)
                this.setState({playlist_id: data.playlist_id})
            })
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

    render() {
        const props = {
            theme: '#F57F17',
            lrcType: 3,
            audio: [
                {
                    name: '光るなら',
                    artist: 'Goose house',
                    url: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.mp3',
                    cover: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.jpg',
                    lrc: 'https://moeplayer.b0.upaiyun.com/aplayer/hikarunara.lrc',
                    theme: '#ebd0c2'
                }
            ]
        };

        return (
            <div>
                <ReactAplayer
                    {...props}
                    onInit={this.onInit}
                    onPlay={this.onPlay}
                    onPause={this.onPause}
                />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Player />,
        document.getElementById('root')
    )
})