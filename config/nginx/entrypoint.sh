#!/bin/bash

envsubst "$SITE_DOMAIN" < /usr/src/live-music/config/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

/usr/src/live-music/bin/install-ssl

exec "$@"