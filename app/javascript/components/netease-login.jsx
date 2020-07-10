import React from 'react'
import MusicAPI from './music-api'
import flash from './flash'

export default class Login extends React.Component {
    async onSubmit(event) {
        event.preventDefault()
        const phone = event.target[0].value
        const password = event.target[1].value
        const api = new MusicAPI()
        const data = await api.loginByPhone(phone, password)
        const cookie = data.cookie
        const id = data.account.id

        if (cookie) {
            localStorage.setItem('cookie', cookie)
            localStorage.setItem('id', id)
            location.reload()
        } else {
            flash('error', '手机号或者密码错误')
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
                            <input type="submit" name="commit" value="登陆" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}