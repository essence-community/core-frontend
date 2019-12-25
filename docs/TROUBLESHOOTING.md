# Не запускается в EDGE

Проблема заключается в react-dev-utils, для решения необходимо открыть [webpackHotDevClient.js](../node_modules/react-dev-utils/webpackHotDevClient.js) и на 67 строке добавить `slashes: true,`

Решение в следующие версии. ПР: https://github.com/facebook/create-react-app/pull/8116/files
