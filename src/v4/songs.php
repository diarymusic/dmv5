<?php
if (isset($LOGINED) && $LOGINED=true) {

}
// else{
//     $_SESSION["admin"] = false;
//     header("location:/manage.php");
//     exit;
// }
?>

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
    <style>
        img{
            width: 100%;
        }
        section{
            border-bottom: 1px solid rgba(0, 0, 0, 0.44);
            margin-bottom: 2rem;
            overflow: scroll;
            padding:2em
        }
        body{
            margin:auto;
            height:100%;
        }
        .gallery{
            width:100%;
        }
        .glry{
            display:block;
            padding:2em;
            overflow: scroll;
            height:calc(100%-2em)
        }
        *::-webkit-scrollbar{
            display: none;
        }
    </style>
</head>
<body data-spy="scroll" data-target="#nav" data-offset="0">
    <script>
        function appendbr(){
            $("#TA").val("123")
        }
        window.onload = function(){
            $('#prv').attr('style','display:none');
        }
        
                
        function formSubmit(formObj){
            formObj.action = 'process.php'; 
            formObj.target = '_self'; 
            formObj.submit();
            
}

// $('#submitbtn').click(function(){
//     alert('1');
//     $('#prv').attr('style','display:block');
//     formSubmit(this.form);
//     $('#submitbtn').scrollTop = 0;
    
// })
$("#submitbtn").bind("click", function(){
    this.hide();

    });

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

const alertTrigger = document.getElementById('submitbtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    alert("test")
    if(empty($_POST["sc"])){}elseif(empty($_POST["st"])){}elseif(empty($_POST["sa"])){}elseif(empty($_POST["sw"])){}elseif(empty($_POST["sl"])){
    alert('Fail', 'danger');
    }else{
    alert('Success', 'success');
    }
  })
}
    </script>
<script>
    $.ajax({
        url: "data.json",
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
                var el = $(
                    '<div class="row">'
                        // +'<div class="col-12">'
                            +'<div class="col-4">'
                                +'<img src="'
                                +c
                                +'"'
                                +'alt='
                                +'"'
                                +ti
                                +'"'
                                +'class='
                                +'"'
                                +'gallery'
                                +'"'
                                +'>'
                            +'</div>'
                            +'<div class="col-8">'
                                +'<h3>'
                                +ti
                                +'</h3>'
                                +'<h5>'
                                +au
                                +'</h5>'
                                +'<p>'
                                +ct
                                +'</p>'
                            +'</div>'
                        // +'</div>'
                    +'</div>'
                    );
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
</script>
    <nav id="nav" class="navbar navbar-expand-sm navbar-light bg-light fixed-top">
          <div class="container">
            <a class="navbar-brand" href="/manage.php">Navbar</a>
            <button class="navbar-toggler d-lg-none bs-js-navbar-scrollspy" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse bs-js-navbar-scrollspy" id="collapsibleNavId">
                <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" href="#s-list" aria-current="page">曲目列表</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#add-song">添加曲目</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#prv">预览</a>
                    </li>
                </ul>
            </div>
      </div>
    </nav>
    
    <section id="s-list">
    <br><br><br><br><br>
        <div class="container">
            <h3>已发行曲目</h3>
            <div class="glry"></div>
    </div>
    </section>
    <!-- ========== Start form ========== -->
    <section id="add-song">
    <div class="container">
        <br><br><br><br>
        <form action="process.php" method="post" target="preview">
            <legend class="col-form-legend col-4">添加曲目</legend>
            <fieldset class="mb-3 row justify-content-center">
                <!-- <legend class="col-form-legend col-4"></legend> -->
                <div class="col-md-6 col-sm-8">
                    <div class="mb-3">
                      <label for="" class="form-label">曲名</label>
                      <input type="text"
                        class="form-control" name="st" id="" placeholder="Song name here" >
                      <br>
                      <label for="" class="form-label">封面</label>
                      <input type="text"
                        class="form-control" name="sc" id="" placeholder="Cover link here" >
                      <br>
                      
                    </div>
                </div>
                <div class="col-md-6 col-sm-8">
                <label for="" class="form-label">制作人</label>
                      <input type="text"
                        class="form-control" name="sa" id="" placeholder="Author here" >
                      <br>
                      <label for="" class="form-label">文案</label>
                      <div class="mb-3">
                        <label for="" class="form-label"></label>
                        <textarea class="form-control" name="sw" id="TA" rows="3" value="" placeholder="文案 尽量简短" ></textarea>
                      </div>
                      <!-- <button type="button" class="btn btn-primary" onclick="appendbr()">追加换行标记</button> -->
                      <br>
                      <label for="" class="form-label">曲目链接</label>
                      <input type="text"
                        class="form-control" name="sl" id="" placeholder="Song link" >
                </div>
            </fieldset>
            <div class="mb-3 row">
                <div class="offset-sm-2 col-sm-8">
                <button type="submit" class="btn btn-primary" id="submitbtn">提交</button>
                <div id="liveAlertPlaceholder"></div>
                    <input type="checkbox" name="nsp" class="form-checkbox"><label for="nsp" class="form-label">新曲预告</label>
                </div>
            </div>
        </form>
    </div>
    </section>
    <!-- ========== End form ========== -->
    <!-- ========== Start preview ========== -->
    <section id="prv" style="">
    <iframe src="process.php" frameborder="0" width="100%" style="height:100%" name="preview"><iframe>        
    </section>

    <!-- ========== End preview ========== -->
    <script>

    </script>
</body>
</html>