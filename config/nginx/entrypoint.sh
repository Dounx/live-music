#!/bin/sh

envsubst "$SITE_DOMAIN" < /usr/src/live-music/config/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

nginx

/usr/src/live-music/bin/install-ssl

exec "$@"