## Live Music

Web 版网易云音乐同步听歌（伪）。

服务器端只负责播放时的同步。

和网易云音乐的数据交换（如账号登陆和歌单获取等）需要通过本地的 Node 服务器进行。

### 依赖

* Ruby 2.7.1
* Node.js >= 12
* Redis
* PostgreSQL

### 开发环境

```bash
# Session 1
bundle
rails db:create
rails db:migrate
rails s

# Session 2
./bin/webpack-dev-server

# Session 3
bundle exec sidekiq

# Session 4
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
cd NeteaseCloudMusicApi
npm install
PORT=18685 node app.js
```

### 注意事项

账号注册的时候需要使用邀请码，可以通过在后台生成。

```ruby
rails console

> 10.times { Activation.create }
> Activation.last(10)
```

用户使用的时候，需要先启动客户端服务器：

```
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
cd NeteaseCloudMusicApi
npm install
PORT=18685 node app.js
```

### 部署

TODO