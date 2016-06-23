# install typings
( exec "./scripts/typings-install.sh" )
# webpack build with dev server and no hot reloading
node_modules/.bin/webpack-dev-server --config ./webpack/config.js