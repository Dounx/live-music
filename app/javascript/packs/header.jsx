import ReactDOM from 'react-dom'
import React from 'react'
import NeteaseLogout from '../components/netease-logout'

document.addEventListener('DOMContentLoaded', () => {
    const cookie = localStorage.getItem('cookie')

    if (cookie) {
        ReactDOM.render(
            <NeteaseLogout/>,
            document.getElementById('netease-logout')
        )
    }
})