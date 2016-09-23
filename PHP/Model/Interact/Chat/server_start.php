<?php

namespace Model\Interact\Chat;

require_once __DIR__ . '/../../../autoload.php';

set_time_limit(0);
ignore_user_abort(true);

$server = new \swoole_websocket_server("0.0.0.0", 10028);

$server->on('open', function (\swoole_websocket_server $server, $request) {
    //print_r($request);
    //echo "server: handshake success with fd{$request->fd}\n";
});

$server->on('message', function (\swoole_websocket_server $server, $frame) {
    DataProcess::pushData($server, $frame);
});

$server->on('close', function ($ser, $fd) {
    DataProcess::delFd($fd);
});

$server->start();
