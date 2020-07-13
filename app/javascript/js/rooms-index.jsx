import ReactDOM from 'react-dom'
import React from 'react'
import NeteaseLogin from '../components/netease-login'
import Playlist from '../components/playlist'

document.addEventListener('turbolinks:load', () => {
    if (document.getElementById('rooms-index')) {
        const { id, cookie } = localStorage

        if (cookie) {
            ReactDOM.render(
                <Playlist id={id} cookie={cookie}/>,
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