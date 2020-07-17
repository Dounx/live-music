import React from 'react'
import Aplayer from 'react-aplayer'
import Spinner from '../components/spinner'

export default class Player extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            channel: this.props.channel
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.audio !== prevProps.audio) {
            this.audioChange(this.props.audio)
            this.removeLoading()
        }
    }

    audioChange(audio) {
        this.ap.list.clear()
        this.ap.list.add(audio)
    }

    removeLoading() {
        if (this.state.isLoading) {
            this.setState({ isLoading: false })
        }
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
        }

        return (
            <div>
                { this.state.isLoading ? <Spinner /> : null }
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