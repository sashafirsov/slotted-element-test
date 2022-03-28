#node types/generate-mixin.js
bash ./test.sh

PACKAGE_VERSION=$(node -pe "require('slotted-element/package.json').version")
echo $PACKAGE_VERSION

BUILD_DIR=dist/esm
SRC_DIR=node_modules/slotted-element
rm -rf dist/*
mkdir dist
#mkdir $BUILD_DIR
#mkdir $BUILD_DIR/demo
#cp $SRC_DIR/demo/* $BUILD_DIR/demo
#cp $SRC_DIR/*.d.ts $BUILD_DIR
#sed "s/..\/src\/css-chain-element.js/css-chain-element.js/" src/demo.html >$BUILD_DIR/demo.html

TARGET_PARAM=--target=chrome97,firefox95,safari15,edge96
# https://kangax.github.io/compat-table/es2016plus/
#esbuild $SRC_DIR/*.js  --minify --sourcemap $TARGET_PARAM --outdir=$BUILD_DIR
#esbuild $SRC_DIR/../css-chain/*.js --minify --sourcemap $TARGET_PARAM --outdir=$BUILD_DIR

# bundle
BUILD_DIR=dist/bundle
mkdir $BUILD_DIR
mkdir $BUILD_DIR/demo
mkdir $BUILD_DIR/render

cp $SRC_DIR/demo/* $BUILD_DIR/demo
cp $SRC_DIR/*.d.ts $BUILD_DIR
esbuild $SRC_DIR/slotted-element.js  --minify --bundle --sourcemap  --format=esm $TARGET_PARAM --outdir=$BUILD_DIR
esbuild $SRC_DIR/render/*.js  --minify --bundle --sourcemap  --format=esm $TARGET_PARAM --outdir=$BUILD_DIR/render
