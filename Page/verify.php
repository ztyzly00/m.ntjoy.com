<?php
require_once __DIR__ . '/../PHP/autoload.php';

use Model\Comment\CommentVerify;

$cmt_list = CommentVerify::getCmtListUnVf();
?>

<html>
    <body>

        <table border="1">
            <tr>
                <th>文章标题</th>
                <th>评论内容</th>
                <th>是否通过</th>
            </tr>
            <?php for ($i = 0; $i < count($cmt_list); $i++) {
                ?>
                <tr>
                    <td><?= $cmt_list[$i]['title'] ?></td>
                    <td><?= $cmt_list[$i]['comment'] ?></td>
                    <td><button onclick="verify('<?= $cmt_list[$i]['commentid'] ?>')"  type="button">通过</button></td>
                </tr>
                <?php
            }
            ?>
        </table>

        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>

        <script>
                        function verify(id) {
//                            alert(id);
                            $.post("http://xm.ntwifi.cn/m.ntjoy.com/PHP/Ajax/CommentVerifyAjax.php", {commentid: id}, function(result) {
                                location.reload();
                            });
                        }
        </script>

    </body>
</html>
