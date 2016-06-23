# create dist/ folder if does not exist
mkdir -p "dist"

# install typings
( exec "./scripts/typings-install.sh" )
if [ ! $? = "0" ]; then
    echo "ERROR: could not install typings"
    exit 1
fi

# webpack build
node_modules/.bin/webpack --config "./webpack/config.prod.js";
if [ ! $? = "0" ]; then
    echo "ERROR: could not build"
    exit 1
fi