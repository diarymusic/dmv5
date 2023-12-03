<?php session_start()?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diary Music 管理后台</title>
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
    <link rel="stylesheet" href="/css/bsstyle.css">
    <link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.2.3/css/bootstrap.min.css">
    <!-- <script src="/backstage/members/upload.js"></script> -->
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
    <link rel="stylesheet" href="/css/survey.css">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <script>jsLoader("bootstrap.bundle.min.js")</script>
</head>

<body>
    <div class="container">
    <h2>Diary Music 底图自选</h2>
        <form method="post" class="mf">
            <div class="mb-3 row">
                <label for="inputName0" class="col-4 col-form-label">作者名</label>
                <div class="col-8">
                    <input type="text" class="form-control" name="n" id="inputName0" placeholder="作者名">
                </div>
            </div>
            <div class="mb-3 row">
                <label for="inputName1" class="col-4 col-form-label">专辑名</label>
                <div class="col-8">
                    <input type="text" class="form-control" name="a" id="inputName1" placeholder="专辑名">
                </div>
            </div>
            <fieldset class="mb-3 row">
                <legend class="col-form-legend col-4">选择专辑封面的风格意向</legend>
                <div class="col-8 row">
                    <div class="col-md-6 col-sm-10">
                        <label class="w-100" for="r1">
                            <input type="radio" class="me-2" name="c" id="r1" autocomplete="off" >场景
                            <img class="w-100" src="/su/cover/1.png" alt="" srcset="">
                        </label>
                    </div>
                    <div class="col-md-6 col-sm-10 mb-4">
                        <label class="w-100" for="r2">
                            <input type="radio" class="me-2" name="c" id="r2" autocomplete="off" >平面像素
                            <img class="w-100" src="/su/cover/2.png" alt="" srcset="">
                        </label>
                    </div>
                    <div class="col-md-6 col-sm-10 mb-4">
                        <label class="w-100" for="r3">
                            <input type="radio" name="c" class="me-2" id="r3" autocomplete="off">立体像素
                            <img class="w-100" src="/su/cover/3.png" alt="" srcset="">
                        </label>
                    </div>
                    <div class="col-md-6 col-sm-10 mb-4">
                        <label class="w-100" for="r4">
                            <input type="radio" name="c" class="me-2" id="r4" autocomplete="off">质感背景
                            <img class="w-100" src="/su/cover/4.png" alt="" srcset="">
                        </label>
                    </div>
                    <div class="col-md-6 col-sm-10 mb-4">
                        <label class="w-100" for="r5">
                            <input type="radio" name="c" class="me-2" id="r5" autocomplete="off">插画
                            <img class="w-100" src="/su/cover/5.png" alt="" srcset="">
                        </label>
                    </div>
                    <div class="col-md-6 col-sm-10 mb-4">
                        <label class="w-100" for="r6">
                            <input type="radio" name="c" class="me-2" id="r6" autocomplete="off">3D Icon
                            <img class="w-100" src="/su/cover/6.png" alt="" srcset="">
                        </label>
                    </div>
                </div>
            </fieldset>
            <div class="mb-3 row">
                <label for="inputName2" class="col-4 col-form-label">你希望底图中所包含的元素</label>
                <div class="col-8">
                    <input type="text" class="form-control" name="g" id="inputName2" placeholder="你希望底图中所包含的元素">
                </div>
            </div>
            <div class="mb-3 row">
                <div class="offset-sm-4 col-sm-8">
                    <button type="submit" class="btn btn-primary">提交</button>
                </div>
            </div>
        </form>
    </div>
    <temp data-token="<?php echo $token?>">
        <script src="/su/s.js"></script>
        <script src="/su/s.js"></script>
</body>

</html>