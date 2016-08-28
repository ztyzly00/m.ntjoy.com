<?php

namespace Model\Interact\Chat;

set_time_limit(0);
ignore_user_abort(true);

$server = new \swoole_websocket_server("0.0.0.0", 10028);

$server->on('open', function (\swoole_websocket_server $server, $request) {
    print_r($request);
    echo "server: handshake success with fd{$request->fd}\n";
});

$server->on('message', function (\swoole_websocket_server $server, $frame) {
//    echo "receive from {$frame->fd}:{$frame->data},opcode:{$frame->opcode},fin:{$frame->finish}\n";
//    $server->push($frame->fd, "this is server");

    $frame->data = "內容暂不予显示";

    foreach ($server->connections as $fd) {
        $server->push($fd, $frame->data);
    }
});

$server->on('close', function ($ser, $fd) {
    echo "client {$fd} closed\n";
});



$server->start();
