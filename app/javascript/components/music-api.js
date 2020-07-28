export default class MusicApi {
  HOST = `${location.protocol}//${location.hostname}:18685`;

  constructor(id = null, cookie = null) {
    this.id = id;
    this.cookie = cookie;
  }

  async loginByPhone(phone, password) {
    let res = await fetch(`${this.HOST}/login/cellphone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({phone: phone, password: password}),
    });
    return await res.json();
  }

  async loginByEmail(email, password) {
    let res = await fetch(`${this.HOST}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({email: email, password: password}),
    });
    return await res.json();
  }

  async getPlaylists() {
    if (!this.cookie) {
      throw 'Not Login';
    }

    let res = await fetch(
        `${this.HOST}/user/playlist?uid=${this.id}&cookie=${this.cookie}`);
    return await res.json();
  }

  async getPlaylist(playlistId) {
    if (!this.cookie) {
      throw 'Not Login';
    }

    let res = await fetch(
        `${this.HOST}/playlist/detail?id=${playlistId}&cookie=${this.cookie}`);
    let data = await res.json();
    let playlist = data.playlist;
    let songIds = data.playlist.trackIds.map(track => track.id);
    let songs = await this._getSongDetail(songIds.join(','));

    for (let track of playlist.tracks) {
      track.url = songs[track.id].url;
      // Due to some unknown bug.
      // Load lrc can lead to send a GET request then failed.
      // Also it's too slow.
      // Can load lrc when play a song?
      // track.lrc = await this._getLrc(track.id)
    }

    return this._format(playlist);
  }

  async _getSongDetail(songId) {
    let res = await fetch(`${this.HOST}/song/url?id=${songId}`);
    let data = await res.json();

    return data.data.reduce((map, song) => {
      map[song.id] = song;
      return map;
    }, {});
  }

  async _getLrc(songId) {
    let res = await fetch(`${this.HOST}/lyric?id=${songId}`);
    let data = await res.json();

    return data.lrc === undefined ? undefined : data.lrc.lyric.replace(/\s+/g,
        ' ').trim();
  }

  _format(playlist) {
    let tracks = playlist.tracks;
    tracks.forEach(track => {
      track.artist = track.ar.map(ar => ar.name).join(' ');
      track.cover = track.al.picUrl;
    });

    return playlist;
  }
}