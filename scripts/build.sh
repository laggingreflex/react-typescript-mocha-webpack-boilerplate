# create dist/ folder if does not exist
mkdir -p "dist"

# webpack build
node_modules/.bin/webpack --config "./webpack/config.prod.js";