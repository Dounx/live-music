## Live Music

Web 版网易云音乐同步听歌。

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

```ruby
10.times { Activation.create }
```

### 部署

只在 Debian 10 环境下测试过。

首先在 root 用户下：

安装 Node.js：
```bash
curl -sL https://deb.nodesource.com/setup_lts.x | bash -
apt-get install -y nodejs
npm install --global yarn
```

创建用户：
```bash
adduser app
adduser app sudo
```

切换用户：
```bash
su app && cd
```

安装 Ruby：
```bash
sudo apt install -y gnupg2

gpg2 --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
\curl -sSL https://get.rvm.io | bash -s stable

source /home/app/.rvm/scripts/rvm
rvm install 2.7.1
```

安装必要环境：
```
sudo apt install -y git tmux nginx postgresql redis libpq-dev

sudo service nginx start
sudo service postgresql start
sudo service redis start
```

设置 Nginx：
```bash
sudo vim /etc/nginx/nginx.conf
```

修改文件中的 user 为 app：
```
user app;
```

```bash
sudo vim /etc/nginx/sites-available/default
```

修改为：
```
upstream app {
    # Path to Puma SOCK file, as defined previously
    server unix:/home/app/live-music/tmp/sockets/puma.sock fail_timeout=0;
}

server {
    listen 80;
    server_name yourdomain.com;

    root /home/app/live-music/public;

    try_files $uri/index.html $uri @app;

    location /api/ {
        proxy_pass http://localhost:18685/;
    }

    location @app {
        proxy_pass http://app;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    location /cable {
        proxy_pass http://app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    error_page 500 502 503 504 /500.html;
    client_max_body_size 4G;
    keepalive_timeout 10;
}
```

重启 Nginx：
```bash
sudo service nginx restart
```

设置数据库：
```bash
sudo -u postgres psql

CREATE USER live_music WITH LOGIN PASSWORD 'yourpassword' CREATEDB;
exit
```

更改配置文件：
```bash
sudo vim /etc/postgresql/11/main/pg_hba.conf
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
sudo service postgresql restart
```

启动：

Session 1:
```bash
tmux new -s server
git clone https://github.com/Dounx/live-music.git

cd live-music
bundle install --without development test

rm config/credentials.yml.enc

EDITOR="gedit --wait" rails credentials:edit

export RAILS_ENV=production
export LIVE_MUSIC_DATABASE_PASSWORD=yourpassword

rails db:create
rails db:migrate
rails assets:precompile

rails s

# Ctrl + b 然后按下 d 分离
```

Session 2：
```bash
tmux new -s job

cd live-music

export RAILS_ENV=production
export LIVE_MUSIC_DATABASE_PASSWORD=yourpassword

bundle exec sidekiq

# Ctrl + b 然后按下 d 分离
```

Session 3：
```bash
tmux new -s api

git clone https://github.com/Binaryify/NeteaseCloudMusicApi.git

cd NeteaseCloudMusicApi
npm install
PORT=18685 node app.js

# Ctrl + b 然后按下 d 分离
```

Session 4:
```bash
tmux new -s console
cd live-music

export RAILS_ENV=production
export LIVE_MUSIC_DATABASE_PASSWORD=yourpassword

rails c

# Ctrl + b 然后按下 d 分离
```

后续想接入 Session 的话可以使用：
```bash
tmux attach -t session_name
```

全站使用 HTTPS（建议）：
```bash
sudo apt install -y certbot python-certbot-nginx
sudo certbot --nginx
```

选择的时候记得选 No redirect。