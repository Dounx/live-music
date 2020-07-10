import React from 'react'

export default class Logout extends React.Component {
    handleClick(event) {
        event.preventDefault()

        localStorage.removeItem('cookie')
        location.reload()
    }

    render() {
        return (
            <a className='dropdown-item' rel='nofollow' href='' onClick={this.handleClick}>网易云账号登出</a>
        )
    }
}