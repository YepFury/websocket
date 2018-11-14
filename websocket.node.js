#!/usr/bin/env node

// [++websocket.server文档++](https://github.com/theturtle32/WebSocket-Node/blob/58f301a6e245ee25c4ca50dbd6e3d30c69c9d3d1/docs/WebSocketServer.md)
var WebSocketServer = require('websocket').server;
var http = require('http');
// 创建服务
var server = http.createServer(function (request, response) {

    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);

    response.end();
});
// 监听端口
server.listen(5566, function () {
    console.log((new Date()) + ' Server is listening on port 5566');
});
// 创建webSocket服务
wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // 在这里设置逻辑以检测是否允许指定的源
    return true;
}
// 监听请求
wsServer.on('request', function (request) {
    if (!originIsAllowed(request.origin)) {
        // 确保我们只接受来自允许的源请求
        request.reject();
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    
    // 监听客户端（浏览器）传递回后台的数据
    connection.on('message', function (message) {
        // 接收到消息后在这里处理，并返回
        setInterval(function (e) {
            connection.sendUTF((Math.random() * 10).toString());
        }, 1000)
    });
    // 请求关闭时
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});