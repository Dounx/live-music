import React from 'react'
import ReactDOM from 'react-dom'

class Logout extends React.Component {
    handleClick(event) {
        event.preventDefault()

        localStorage.removeItem('cookie')
        location.reload()
    }

    render() {
        return (
            <a className="dropdown-item" rel="nofollow" href="#" onClick={this.handleClick}>网易云账号登出</a>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cookie = localStorage.getItem('cookie')

    if (cookie) {
        ReactDOM.render(
            <Logout/>,
            document.getElementById('netease-logout')
        )
    }
})