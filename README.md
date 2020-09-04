## Live Music

Web 版网易云音乐同步听歌。

关于为什么要登陆网易云账号，是为了获取歌单以及歌曲信息。

服务器端不保存任何和网易云相关的账号信息，调用 API 通过 HTTPS，没有安全隐患。

### 依赖

* Ruby 2.7.1
* Node.js >= 12
* Yarn
* Redis
* PostgreSQL
* Tmux

### 开发环境

```bash
bin/setup
tmux -f dev.tmux.conf attach
```

### 部署

```bash
mkdir live-music && cd live-music
git clone https://github.com/Dounx/live-music
bin/generate-secret
vim app.local.env
docker-compose up
```