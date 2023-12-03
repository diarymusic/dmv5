<?php
function customerr($errno, $errstr){
    // echo "<b>Error:</b> [$errno] $errstr";
}
// set_error_handler('customerr');
//  防止全局变量造成安全隐患
if(isset($_POST['page'])){
}
$admin = false;
//  启动会话，这步必不可少
session_start();
//  判断是否登陆
echo $_SESSION['username'];
if (isset($_SESSION["admin"]) && $_SESSION["admin"] === true) {
    // echo "您已经成功登陆";
    $enabled = true;
    $disabled = false;
    $so_enabled = true;
    $pi_enabled = true;
    $ot_enabled = true;
    $LOGINED=true;
    if(empty($_POST['page'])){
      
      
      print <<<EOF
      <!DOCTYPE html>
      <html lang="zh">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
          <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css">
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/main.css">
          <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/js/bootstrap.bundle.min.js"></script>
          <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
          <script src="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/manual.js"></script>
          <script src="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/lbl-min.js"></script>
          <script>
function test(){
$.ajax({url:"logout.php", success:function(result){
$("#logoutbtn").text(result);}
})
} 
</script>
      </head>
      <body>
<section>
<br><br><br><br><br><br><br><br><br>
<div class="container">
<div class="row">
  <div class="col-4">
EOF;
print('Welcome,'.$_SESSION["username"]);
print <<<EOF
  </div>
  <div class="col-4">
EOF;
print('UID:'.$_SESSION["uid"]);
print <<<EOF
  </div>
  <div class="col-4">
EOF;
print <<<BTN
<form action="manage.php" method="post" style="margin:0">
<input type="hidden" name="logout" value="true">
<button class="btn btn-primary" type="submit"
>登出</button>
</form>
BTN;
print <<<EOF
  </div>
</div>
  <div class="row">
    <div class="col-4">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">曲目管理</h3>
          <p class="card-text">Songs</p>
EOF;
if($LOGINED === true && $so_enabled === true){
print <<<BTN
<form action="manage.php" method="post" style="margin:0">
<input type="hidden" name="page" value="songs">
<button class="btn btn-primary" type="submit"
>进入</button>
</form>
BTN;
}
print <<<EOF
          
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">图库管理</h3>
          <p class="card-text">Artworks</p>
EOF;
if($LOGINED === true && $pi_enabled === true){
  print <<<BTN
  <form action="manage.php" method="post" style="margin:0">
  <input type="hidden" name="page" value="artworks">
  <button class="btn btn-primary" type="submit"
  >进入</button>
  </form>
BTN;
  }
  print <<<EOF
        </div>
      </div>
    </div>
    <div class="col-4">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title">其他</h3>
          <p class="card-text">Others</p>
EOF;
if($LOGINED === true && $ot_enabled === true){
  print <<<BTN
  <form action="manage.php" method="post" style="margin:0">
  <input type="hidden" name="page" value="others">
  <button class="btn btn-primary" type="submit"
  >进入</button>
  </form>
  BTN;
  }
          print <<<EOF
          </div>
      </div>
    </div>
  </div>
</div>
</section>

</body>
</html>
EOF;


    
    }
    if(isset($_POST['page'])){
      // echo"test";
      // var_dump($_POST['page']);
      if($_POST['page'] == 'songs'){
        print(file_get_contents('songs.php'));
        echo"song";
      }elseif($_POST['page'] == 'artworks'){
        print(file_get_contents('artworks.php'));
        echo"art";
      }elseif($_POST['page'] == 'others'){
        print(file_get_contents('others.php'));
        echo"others";
      }else{

      }
    }
    if(isset($_POST['logout'])){
      if($_POST['logout'] == true){
        echo"test";
      $_SESSION["admin"] = false;
      print(file_get_contents('login.php'));
      }
    }
} else {

    //  验证失败，将 $_SESSION["admin"] 置为 false
    $_SESSION["admin"] = false;
    // // header("location:/login.php");
    // exit;
    print(file_get_contents('login.php'));
}

$_fail = <<<EOF
<html>
<head><title>404 Not Found</title>
</head>
<body>
<center><h1>404 Not Found</h1></center>
<hr><center>nginx</center>
</body>
</html>
EOF;
            // if($LOGINED === false){
            //     echo $_fail;
                
            // }else{
                
            //     }
            ?>
