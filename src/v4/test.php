<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <title>Diary Music - 新生代电子音乐厂牌</title>
    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/main.css">
    <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script src="manual.js"></script>
    <script src="js/lbl-min.js"></script>
    
</head>
<body>
    <!-- <script>
    $.ajax({
        url: "user.json",
        dataType: "json",
        //读取成功后执行
        success: function(data){
            // alert(data)
            
            for (let ix = 0; ix < data.length; ix++) {
                var c = data[ix].cover
                var l = data[ix].link
                var ti = data[ix].title
                var ct = data[ix].idct
                var au = data[ix].author
                var el = $('<img src='+'"'+c+'"'+'alt=""'+'data-title='+'"'+ti+'"'+'data-author='+'"'+au+'"'+'data-idct='+'"'+ct+'"'+'data-link='+'"'+l+'"'+'class="gallery"'+'data-bs-toggle="modal"'+'data-bs-target="#modalGallery"'+'>');
            el.appendTo($('.glry'));
            } 
            let nc = data[0].cover;
            let nl = data[0].link;
            let nt = data[0].title;
            let ni = data[0].idct;
            let na = data[0].author;
            //
            $('.nSongTit').empty().text(nt);
            $(".nSongLin").attr("href",nl);
            $('.nSongAuth').empty().text(na);
            $(".nSongCov").attr("src",nc);
            $('.nSongInd').empty().text(ni);
            // document.write(data)
        }
    });
</script> -->
    <!-- <div class="glry"></div> -->
    <?php
    // $content=$_POST['sl'];
    // $fileContent = file_get_contents('process.php');
    // $str = str_replace('{$WYYPRV}',$content,$fileContent);
    // echo $str;





?>
    <?php
// 生成一个PHP数组
$path = 'user.json';
$cont = json_decode(file_get_contents($path),true);
var_dump($cont);
$data0 = array(
    array(
        "cover"=>$_POST["sc"],
        "title"=>$_POST["st"],
        "author"=>$_POST["sa"],
        "idct"=>$_POST["sw"],
        "link"=>$_POST["sl"]
    )
);
array_unshift($cont,$data0);
 
// 把PHP数组转成JSON字符串
$json_string = json_encode($cont,JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
 
// 写入文件
var_dump($cont);
file_put_contents($path, $json_string);
?>
</body>
</html>
