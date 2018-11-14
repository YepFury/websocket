// 创建 websocket
const ws = new WebSocket("ws://example:8080/websocket", 'echo-protocol');
// 连接后台websocket
ws.onopen = function() {
// Web Socket 已连接上，使用 send() 方法向后台发送数据
ws.send("发送数据");
    console.log("数据发送中...");
};
// 接收到推送的消息
ws.onmessage = function(evt) {
var received_msg = evt.data;
    console.log(received_msg);
    console.log("数据已接收...");
};
// 关闭 websocket
ws.onclose = function() {
    console.log("连接已关闭...");
};