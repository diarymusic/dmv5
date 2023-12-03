<!DOCTYPE html>
<html lang="en">
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
    <script src="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/manual.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/diarymusic/dmcdn/lbl-min.js"></script>
    <style>
        img{
            width: 100%;
        }
    </style>
</head>
<body>
    
<br><br><br><br><br><br><br><br>
<div class="container">
    <div class="row justify-content-center">
        <h3>预览</h3>
        <div class="col-4 text-center">
            <div class="col-12">
                <h3><?php print $_POST["st"];?></h3>
                <h4><?php print $_POST["sa"];?></h4>
            </div>
            <div class="col-12">
                <p><?php print $_POST["sw"];?></p>
            </div>
        </div>
        <div class="col-4">
            <img src="<?php print $_POST["sc"];?>" alt="Cover link&nbsp;<?php print $_POST["sc"];?>" srcset="">
        </div>
        <div class="col-4">
            <a href="<?php print $_POST["sl"];?>"></a>
            <button class="btn btn-primary">收听</button>
            <button class="btn btn-primary">确认提交</button>
            
        </div>
    </div>
    <div class="row justify-content-center align-items-center g-2">
        <div class="col">
        </div>
    </div>
    <iframe src="<?php print $_POST['sl']?>" frameborder="0" width="100%" style="height:700px"></iframe>
</div>
<?php
// 生成一个PHP数组
function datawri($path,bool $once){
    $cont = json_decode(file_get_contents($path),true);
    $data0 = 
    // array(
        array(
            "cover"=>$_POST["sc"],
            "title"=>$_POST["st"],
            "author"=>$_POST["sa"],
            "idct"=>$_POST["sw"],
            "link"=>$_POST["sl"]
        );
    // );
    if($once == true){
        $cont = $data0;
        $json_string = json_encode($cont,JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        file_put_contents($path, $json_string);
    }else{
    array_unshift($cont,$data0);
    $json_string = json_encode($cont,JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    file_put_contents($path, $json_string);
    }
}
    
if(empty($_POST["sc"])){}elseif(empty($_POST["st"])){}elseif(empty($_POST["sa"])){}elseif(empty($_POST["sw"])){}elseif(empty($_POST["sl"])){}elseif(isset($_POST["nsp"])){
    datawri('user.json',true);
}else{
    datawri('data.json',false);
}
?>
</body>
</html>