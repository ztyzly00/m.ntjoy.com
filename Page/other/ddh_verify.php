<?php
require_once __DIR__ . '/../../PHP/autoload.php';

use Model\Other\Ddh\DdhVerify;

$content_array = DdhVerify::getContent();
?>

<html>
    <body>

        <table border="1">
            <tr>
                <th>互动内容</th>                
                <th>是否通过</th>                
            </tr>
            <?php for ($i = 0; $i < count($content_array); $i++) {
                ?>
                <tr>
                    <td id="content<?= $content_array[$i]['id'] ?>"><?= $content_array[$i]['content'] ?></td>
                    <td><button onclick="verify('<?= $content_array[$i]['id'] ?>')"  type="button">通过</button></td>
                </tr>
                <?php
            }
            ?>
        </table>

        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>

        <script>

                    ws = new WebSocket("ws://xm.ntwifi.cn:10028");

                    ws.onopen = function() {
                        //var send_string = '{"header":"confirm","content":{"classify":"ddh"}}';
                        //send_string = $.parseJSON(send_string);
                        //ws.send(send_string);
                    };

                    ws.onmessage = function(e) {

                    };

                    function verify(id) {



                        var data = $('#content' + id).html();
                        var send_string = '{"header":"message","content":{"classify":"ddh","data":"' + data + '","password":"zhentianyu28"}}';
                        ws.send(send_string);
                        $.get("/Ajax/Other/Ddh/DdhAjax.php", {opt: 'pass', id: id}, function(result) {

                        });
                    }

                    function deleteComment(id) {
                        $.post("http://xm.ntwifi.cn/m.ntjoy.com/PHP/Ajax/CommentDelete.php", {commentid: id}, function(result) {
                            location.reload();
                        });
                    }
        </script>

    </body>
</html>
