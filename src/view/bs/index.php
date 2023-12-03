<?if($_SESSION['ls']==1&&$_SESSION['ad']==1){?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
        <title>Diary Music 管理后台</title>
        <link rel="stylesheet" href="/css/bsstyle.css">
        <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css">
        <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
        <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
    </head>
<body>
    <nav class="close" id="collapseNav">
        <div class="logo-name">
        <div class="logo-image">
                    <img src="" alt="" id="userAvataroc" class="userAvatar">
                </div>
                <!-- 上方src添加个人头像 -->

                <span class="logo_name userName" id="userName"></span>&nbsp;&nbsp;&nbsp;
            <button type="button" class="btn-close text-reset closeBtn" aria-label="Close"></button>
        </div>
        <!-- <span class="logo_uid pe-3 userId" id="userId"></span> -->
        <div class="menu-items">
            <ul class="nav-links">
                <li class="current"><a href="/backstage/?action=dashboard">
                    <i class="uil uil-estate"></i>
                    <span class="link-name">仪表盘</span>
                </a></li>
                <li><a href="/backstage/?action=broadcast">
                    <i class="uil uil-chart"></i>
                    <span class="link-name">公告管理</span>
                </a></li>
                <li><a href="/backstage/?action=artworks">
                    <i class="uil uil-image-check"></i>
                    <span class="link-name">美工处理</span>
                </a></li>
                <li><a href="/backstage/?action=contacts">
                    <i class="uil uil-comments"></i>
                    <span class="link-name">发行对接</span>
                </a></li>
                <li><a href="/backstage/?action=members">
                    <i class="uil uil-user"></i>
                    <span class="link-name">职务管理</span>
                </a></li>
            </ul>

            <ul class="logout-mod">
                <li><a class="signoutBtn" role="button">
                    <i class="uil uil-signout"></i>
                    <span class="link-name">退出登录</span>
                </a></li>
            </ul>
        </div>
    </nav>
    <div class="top">
                <!-- <a data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="collapseNav" aria-label=""> -->
                <div class="col-12">
                    <a class="nav-toggler sidebar-toggle" role="button" data-tgt="#collapseNav">
                        <i class="uil uil-bars sidebar-toggle"></i>
                    </a>
                </div>
            </div>
    <!-- <div class="container">
        <div class="row justify-content-center align-items-center">

        </div>
    </div> -->
<div class="grey"></div>
<?php echo $content;?>
    <script>
    jsLoader(`Custom::let t = $('.nav-toggler').attr('data-tgt');
        let cb = $('.nav-toggler');
        var collapsed ='y';
        $(cb).click(function(){
            if (collapsed === 'y') {
                $(t).attr('class', 'unfold');
                collapsed = '';
            }else{
                $(t).attr('class', 'close');
                collapsed = 'y';
            }
        })

    $('#collapseNav').hover(()=>{
        $('#collapseNav').addClass('hov')
    },()=>{
        $('#collapseNav').removeClass('hov')
    })
    $('.closeBtn').on('click',()=>{
        $('#collapseNav').removeClass('hov')
    })`)
    </script>
    <temp data-token="<?php echo $token?>">
    <script src="/js/src/user.js"></script>
</body>
</html>
<?}else{?>
    <script>location.href = "?action=login"</script>
<?}