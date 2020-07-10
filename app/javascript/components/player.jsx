import React from 'react'
import Aplayer from 'react-aplayer'

export default class Player extends React.Component {
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
                <Aplayer
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