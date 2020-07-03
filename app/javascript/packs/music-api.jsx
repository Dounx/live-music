export default class MusicApi {
    HOST = 'http://localhost:4000'

    constructor() {
        this.cookie = undefined
        this.profile = undefined
        this.isLogin = false
    }

    async loginByPhone(phone, password) {
        let res = await fetch(`${this.HOST}/login/cellphone`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({phone: phone, password: password})
        })
        let data = await res.json()

        if (data.code === 200) {
            this.cookie = data.cookie
            this.profile = data.profile
            this.isLogin = true
        } else {
            return false
        }

        return true
    }

    async loginByEmail(email, password) {
        let res = await fetch(`${this.HOST}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: email, password: password})
        })
        let data = await res.json()

        if (data.code === 200) {
            this.cookie = data.cookie
            this.profile = data.profile
            this.isLogin = true
        } else {
            return false
        }

        return true
    }

    async getPlaylistId(roomId) {
        let res = await fetch(`http://127.0.0.1:3000/rooms/${roomId}.json`)
        let data = await res.json()

        return data.playlist_id
    }

    async getPlaylist(playlistId) {
        if (!this.isLogin) {
            throw 'Not Login'
        }

        let res = await fetch(`${this.HOST}/playlist/detail?id=${playlistId}&cookie=${this.cookie}`)
        let data = await res.json()
        let playlist = data.playlist
        let songIds = data.playlist.trackIds.map(track => track.id)
        let songs = await this._getSongDetail(songIds.join(','))

        for (let track of playlist.tracks) {
            track.url = songs[track.id].url
            // Due to some unknown bug.
            // Load lrc can lead to send a GET request then failed.
            // Also it's too slow.
            // Can load lrc when play a song?
            // track.lrc = await this._getLrc(track.id)
        }

        return this._format(playlist)
    }

    getProfile() {
        if (!this.isLogin) {
            throw 'Not Login'
        }

        return {
            nickname: this.profile.nickname,
            avatarUrl: this.profile.avatarUrl
        }
    }

    async _getSongDetail(songId) {
        let res = await fetch(`${this.HOST}/song/url?id=${songId}`)
        let data = await res.json()

        let songs = data.data.reduce((map, song) => {
            map[song.id] = song
            return map
        }, {})

        return songs
    }

    async _getLrc(songId) {
        let res = await fetch(`${this.HOST}/lyric?id=${songId}`)
        let data = await res.json()

        return data.lrc === undefined ? undefined : data.lrc.lyric.replace(/\s+/g,' ').trim()
    }

    _format(playlist) {
        let tracks = playlist.tracks
        tracks.forEach(track => {
            track.artist = track.ar.map(ar => ar.name).join(' ')
            track.cover = track.al.picUrl
        })

        return playlist
    }
}