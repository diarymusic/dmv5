<?
session_start();
$_SESSION['ls']=(isset($_SESSION['ls']))?$_SESSION['ls']:0;
$_SESSION['ad']=(isset($_SESSION['ad']))?$_SESSION['ad']:0;
// echo $_SESSION['ls'].PHP_EOL.$_SESSION['ad'];
// print_r($_SESSION);
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diary Music</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.js"></script>
    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css">
    <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/js/bootstrap.bundle.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/lbl-min.js"></script>
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <script>
        //motions
        $(function ($) {
            var tptxt = document.getElementsByClassName('typing');
            var tp = tptxt[0].getAttribute('data-text');
            $(".typing").lbyl({
                content: tp,
                speed: 50,
                type: 'show',
                finished: function () {
                } // Finished Callback
            });
        });
        function loginPage() {
            window.location.href = "/login"
        }

    </script>
</head>

<body>
    <div id="page" class="site">
        <div class="container">
            <div class="row justify-content-center align-items-center g-2">
                <div class="col-xs-8 col-sm-10 col-md-6 col-lg-6">
                    <div class="hero">
                        <h1 class="" data-text="">您的登录状态：<?if($_SESSION['ls']==1){?>已登录<?}else{?>未登录<?}?></h1>
                        <p>如果您没有账号,您可<a href="/?action=register">在此注册</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>