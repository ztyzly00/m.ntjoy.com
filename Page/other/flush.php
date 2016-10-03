<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <title>WAP刷新</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
        <input id="inputvalue" type="text" placeholder="请输入密码">
        <button id='currbutton'>强制刷新</button>
        <script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
        <script>
            $('#currbutton').click(function() {
                var pass = $('#inputvalue').val();
                $.get("/Ajax/Flush/flushAjax.php", {pass: pass}, function(result) {
                    alert(result);
                });
            });

        </script>
    </body>
</html>
