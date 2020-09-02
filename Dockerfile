FROM ruby:2.7.1

ARG SECRET_KEY_BASE=fake_secure_for_compile

RUN gem install bundler
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get -y install postgresql-client yarn

ENV RAILS_ENV production
WORKDIR /usr/src/live-music
COPY . .
RUN bundle config set without 'development test' && \
    bundle install && \
    rails assets:precompile
