<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <title>Diary Music - 新生代电子音乐厂牌</title>
    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/main.css">
    <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/manual.js"></script> -->
    <script src="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/lbl-min.js"></script>
    
</head>
<body>
<section>
<br><br><br><br><br><br><br><br><br><br>
    <div class="container">
        <form action="log.php" target="log" method="post">
            <div class="mb-3 row">
                <label for="acc" class="col-4 col-form-label">账号</label>
                <div class="col-8">
                    <input type="text" class="form-control" name="acc" id="acc" placeholder="账号" required>
                </div>
            </div>
            <div class="mb-3 row">
                <label for="psw" class="col-4 col-form-label">密码</label>
                <div class="col-8">
                    <input type="text" class="form-control" name="psw" id="psw" placeholder="密码" required>
                    <!-- <input type="hidden" value=""> -->
                </div>
            </div>
            <div class="mb-3 row">
                <div class="offset-sm-4 col-sm-8">
                    <button type="submit" class="btn btn-primary">登录</button>
                </div>
            </div>
        </form>
        <iframe src="log.php" frameborder="0" name="log" width="100%" style="height:500px"></iframe>
    </div>
</section>
</body>
</html>