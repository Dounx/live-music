import ReactDOM from 'react-dom'
import React from 'react'
import NeteaseLogout from '../components/netease-logout'

document.addEventListener('turbolinks:load', () => {
    const cookie = localStorage.getItem('cookie')

    if (cookie) {
        ReactDOM.render(
            <NeteaseLogout/>,
            document.getElementById('netease-logout')
        )
    }

    const element = (document.getElementById('logout'))

    if (element) {
        element.addEventListener('click', () => {
            localStorage.removeItem('id')
            localStorage.removeItem('cookie')
        })
    }
})