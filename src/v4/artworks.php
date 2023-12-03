<?php
if (isset($LOGINED) && $LOGINED=true) {

}
else{
    $_SESSION["admin"] = false;
    header("location:/manage.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
                    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/main.css">
                    <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/js/bootstrap.bundle.min.js"></script>
                    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
                    <script src="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/lbl-min.js"></script>
</head>
<body>
    <div class="container">
        <form action="" method="">
            <div class="mb-3 row">
                <label for="inputName" class="col-4 col-form-label">链接</label>
                <div class="col-8">
                    <input type="text" class="form-control" name="inputName" id="inputName" placeholder="Name">
                </div>
            </div>
            <div class="mb-3 row">
                <div class="offset-sm-4 col-sm-8">
                    <button type="submit" class="btn btn-primary">提交</button>
                </div>
            </div>
        </form>
    </div>
</body>
</html>