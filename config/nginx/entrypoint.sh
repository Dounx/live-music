#!/bin/sh

# DON'T USE ""
# shellcheck disable=SC2016
envsubst '$SITE_DOMAIN' < /usr/src/live-music/config/nginx/templates/default.conf.template > /etc/nginx/sites-enabled/default

nginx

/usr/src/live-music/bin/install-ssl

exec "$@"