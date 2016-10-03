from fabric.api import local


def webpack():
    local('rm -rf photo_magick/photo_editor/static/bundles/prod/*')
    local('webpack --config webpack.prod.config.js --progress --colors')
