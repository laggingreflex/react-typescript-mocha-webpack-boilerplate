# install typings
( exec "./scripts/typings-install.sh" )
# webpack build in memory with dev server and hot reloading
node_modules/.bin/webpack-dev-server --inline --hot --config "./webpack/config.js";