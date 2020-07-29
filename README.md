## Live Music

Web 版网易云音乐同步听歌（伪）。

服务器端只负责播放时的同步。

和网易云音乐的数据交换（如账号登陆和歌单获取等）需要通过本地的 Node 服务器进行。

### 依赖

* Ruby 2.7.1
* Node.js >= 12
* Yarn
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

```bash
rails console
```

```ruby
10.times { Activation.create }
```

用户使用的时候，需要先启动客户端服务器：

```
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
cd NeteaseCloudMusicApi
npm install
PORT=18685 node app.js
```

### 部署

以下步骤皆为在 Debian 10 root 用户下进行。

安装 Ruby：
```bash
apt install gnupg2
gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable

source /etc/profile.d/rvm.sh
rvm install 2.7.1
```

安装必要环境：
```
apt install git
apt install tmux
apt install nginx
apt install postgresql
apt install redis
apt install libpq-dev

service nginx start
service postgresql start
service redis start
```

安装 nodejs：
```bash
curl -sL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs
npm install --global yarn
```

设置数据库：
```bash
sudo -u postgres psql

CREATE USER live_music WITH LOGIN PASSWORD 'yourpassword' CREATEDB;
exit
```

更改配置文件：
```bash
vim /etc/postgresql/x.x/main/pg_hba.conf
```

更改以下一行：
```
# "local" is for Unix domain socket connections only
local   all             all                                     peer
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```

为：
```
# "local" is for Unix domain socket connections only
local   all             all                                     md5
# IPv4 local connections:
host    all             all             127.0.0.1/32            md5
# IPv6 local connections:
host    all             all             ::1/128                 md5
```

重启 PostgreSQL：
```bash
service postgresql restart
```

启动 Rails：
```bash
git clone https://github.com/Dounx/live-music.git

cd live-music
bundle

EDITOR="gedit --wait" rails credentials:edit

export RAILS_ENV=production
export LIVE_MUSIC_DATABASE_PASSWORD=yourpassword

rails db:create
rails db:migrate
rails assets:precompile
```

启动 API：
```bash
git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git
```