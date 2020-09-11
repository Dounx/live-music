## Live Music

Web 版网易云音乐同步听歌。

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
git clone https://github.com/Dounx/live-music
cd live-music
bin/generate-secret
vim app.local.env
docker-compose up
```
