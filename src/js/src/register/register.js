var flag1 = 0;//环节状态
var flag2 = 0;//环节状态
var flag3 = 0;//环节状态
var flag4 = 0;//环节状态
var flag5 = 0;//环节状态
var flag6 = 0;
var flag7 = 0;
// var to;

function img2Base64(input_file, get_data) {
    /*input_file：文件按钮对象*/
    /*get_data: 转换成功后执行的方法*/
    if (typeof (FileReader) === 'undefined') {
        console.log("图片异常")
    } else {
        try {
            /*图片转Base64 核心代码*/
            var file = input_file.files[0];
            //这里我们判断下类型如果不是图片就返回 去掉就可以上传任意文件
            if (!/image\/\w+/.test(file.type)) {
                console.log("图片img2base64：转化成功");
                return false;
            }
            var reader = new FileReader();
            reader.onload = function () {
                get_data(this.result);
            }
            reader.readAsDataURL(file);
        } catch (e) {
            console.log("图片img2base64：转化失败")
            console.log(local_message.E_CODE_0008 + e.toString());
        }
    }
}

var bs64 = {

encode : (e) => {
    let str = encodeURI(e);
    let bs = btoa(str);
    // console.log(base64);
    return bs;
},
decode : (e) => {
    let bs = atob(e);
    let str = decodeURI(bs);
    // console.log(str);
    return str;
}
}



function vf(s) {
    switch (true) {
        case s == 1:
            $('#vfi').removeClass('col-8');
            $('#vfi').addClass('col-6');
            $('#vfb').removeClass('col-4');
            $('#vfb').addClass('col-6');
            $('#vfsp').removeClass('d-none');
            break;
        case s == 0:
            $('#vfi').addClass('col-8');
            $('#vfi').removeClass('col-6');
            $('#vfb').addClass('col-4');
            $('#vfb').removeClass('col-6');
            $('#vfsp').addClass('d-none');
            break;
        default:
            break;
    }
}

// console.log('Your Token Is : ' + to);
$(() => {
    $.ajax({
        url: '/app/model/api/geneUUID/',
        dataType: 'json',
        type: "GET",
        async: false,
        success: function (resp) {
            if (resp.status == "200") {
                to = resp.uuid;
                console.log('Your Token Is : ' + to);
            } else {

            };
            // token = (resp.status == "200") ? resp.uuid[0] : 0;

        }
    });

    // var form_data = new FormData();
    // form_data.append('to', to);
    $.ajax({
        url: '/app/model/api/register/lock/?to=' + to,
        dataType: 'json',
        type: "GET",
        async:false,
        success: function (resp) {
            flag1 = (resp.status == "200") ? 1 : 0;
        }
    });
    $.ajax({
        url: '/app/model/api/geneVerf/?to=' + to,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        async:false,
        // data: form_data,
        type: "GET",
        success: function (resp) {
            flag4 = (resp.status == "200") ? 1 : 0;
            console.log(resp.code)
        }
    })

    //
    window.addEventListener("beforeunload", (event) => {
        if (flag6 == 0) {
            event.preventDefault();
            // Chrome requires returnValue to be set.
            event.returnValue = "确认离开？您输入的内容不会被保存";
            // alert("test")
        }
        // Cancel the event as stated by the standard.

    });


    window.addEventListener('unload', (event) => {
        if (flag6 == 0) {
            $.ajax({
                url: '/app/model/api/register/unlock/?to=' + to + '&st=0'
            });
            // 加一段同步代码阻塞一下，不然刷新会发不出去异步请求
            let now = new Date()
            while (new Date() - now < 100) { }
        }

    })
})
$('input[name=ue]').on('blur', () => {
    $.ajax({
        url: '/app/model/api/checkIsset/?em=' + $('input[name=ue]').val(),
        dataType: 'json',
        success: (resp) => {
            if (resp.status == '404') {
                flag7 = 0;
                $('input[name=ue]').addClass('danger')
                $(".typing").lbyl({
                    content: '邮箱已存在，尝试换一个邮箱再试',
                    speed: 100,
                    type: 'show',
                    finished: function () {

                    }
                });
            } else {
                if ($('input[name=ue]').val() == '') {
                    flag7 = 0;
                    $(".typing").lbyl({
                        content: '请填写一个邮箱',
                        speed: 100,
                        type: 'show',
                        finished: function () {

                        }
                    });
                } else {
                    $(".typing").lbyl({
                        content: '邮箱可用',
                        speed: 100,
                        type: 'show',
                        finished: function () {

                        }
                    });
                    flag7 = 1;
                    $('input[name=ue]').removeClass('danger')
                }
            }
        }
    })
})
$("#fileAjax").on('change', () => {
    // console.log($('#fileAjax').prop('files')[0]);
    var reader = new FileReader();
reader.readAsDataURL($('#fileAjax').prop('files')[0]);
reader.onload = function(){
    var form_data = new FormData();
    form_data.append('bs',reader.result);
    form_data.append('to',to);
    $.ajax({
        url: '/app/model/api/bs64up/', // point to server-side PHP script 
        dataType: 'json',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (resp) {
            if(resp.status == "200"){
                flag2=1;
                $('.c10').addClass('col-10')
                $('.c10').removeClass('col-12')
                $('.previewAva').remove()
            $('<div class="col-2"><img src="'+reader.result+'" alt="" srcset="" class="previewAva"></div>').appendTo('.avaUpl')
            }else{
                flag2=1;
                $('.c10').removeClass('col-10')
                $('.c10').addClass('col-12')
                $('.previewAva').remove()
            }
        }
    })
    // console.log(reader.result);
     //获取到base64格式图片
};
    /*
    var file_data = $('#fileAjax').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    form_data.append('token', to);
    // alert(form_data);                             
    $.ajax({
        url: '/app/model/api/upload/', // point to server-side PHP script 
        dataType: 'json',  // what to expect back from the PHP script, if anything
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'POST',
        success: function (resp) {
            if(resp.status == "200"){
                flag2=1;
                $('.c10').addClass('col-10')
                $('.c10').removeClass('col-12')
                $('.previewAva').remove()
            $('<div class="col-2"><img src="'+resp.path+'" alt="" srcset="" class="previewAva"></div>').appendTo('.avaUpl')
            $('#avatarPath').val('')
            $('#avatarPath').val(resp.path)
            }else{
                flag2=1;
                $('.c10').removeClass('col-10')
                $('.c10').addClass('col-12')
                $('.previewAva').remove()
                $('#avatarPath').val('')
            }
        }
    });*/
});

$('.send').on('click', () => {
    flag5 = 1;
    $('#vfi').removeClass('col-8');
    $('#vfi').addClass('col-6');
    $('#vfb').removeClass('col-4');
    $('#vfb').addClass('col-6');
    $('#vfsp').removeClass('d-none');
    $('.send').attr("disabled", 'disabled');
    $(".typing").lbyl({
        content: '正在发送验证码...',
        speed: 100,
        type: 'show',
        finished: function () {

        }
    });
    $.ajax({
        url: '/app/model/api/sendCode/?to=' + to + '&em=' + $('input[name=ue]').val(), // point to server-side PHP script 
        dataType: 'json',  // what to expect back from the PHP script, if anything
        type: 'GET',
        success: function (resp) {
            if (resp.status == "200") {
                // $('.send').removeAttr("disabled");
                flag5 = 1
                $(".typing").lbyl({
                    content: '验证码发送成功，请注意接收',
                    speed: 100,
                    type: 'show',
                    finished: function () {

                    }
                });
            } else {
                flag5 = 0;
                $('#vfi').addClass('col-8');
                $('#vfi').removeClass('col-6');
                $('#vfb').addClass('col-4');
                $('#vfb').removeClass('col-6');
                $('#vfsp').addClass('d-none');
                $(".typing").lbyl({
                    content: '验证码发送失败',
                    speed: 100,
                    type: 'show',
                    finished: function () {

                    }
                });
            }
        }
    });
    setTimeout(() => {
        if (flag5 == 0) {
            $('.send').removeAttr("disabled");
            $(".typing").lbyl({
                content: '验证码发送超时',
                speed: 100,
                type: 'show',
                finished: function () {

                }
            });
        }

    }, 10000);

})
$('.submit').on('click', () => {
    if ($('input[name=pw]').val() == $('input[name=repsw]').val()) {
        $('.submit').attr("disabled");
        $('.rsp').removeClass('d-none');
        $(".typing").lbyl({
            content: '正在注册...',
            speed: 100,
            type: 'show',
            finished: function () {
            }
        });
        var un = $('input[name=un]').val()
        var ue = $('input[name=ue]').val()
        var pw = b64_sha256($('input[name=pw]').val())//不可逆
        var vf = $('input[name=vf]').val()
        var al = ($('#rm').prop('checked'))?true:false;
        var form_data = new FormData();
        form_data.append('un', un)
        form_data.append('ue', ue)
        form_data.append('pw', pw)
        form_data.append('to', to)
        form_data.append('vf', vf)
        form_data.append('al', al)
        $.ajax({
            url: '/app/model/api/register/', // point to server-side PHP script 
            dataType: 'json',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            type: 'POST',
            success: function (resp) {
                // $('').val(resp[0].data[0]);
                flag3 = (resp.status == "200") ? 1 : 0;
                flag6 = 1;
                // console.log("success");

                $.ajax({
                    url: '/app/model/api/register/unlock/?to=' + to, // point to server-side PHP script 
                    dataType: 'json',  // what to expect back from the PHP script, if anything
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form_data,
                    type: 'POST',
                    success: function (resp) {
                        // $('').val(resp[0].data[0]);
                        flag3 = (resp.status == "200") ? 1 : 0;
                    }
                });
                $('.submit').removeAttr("disabled");
                $('.rsp').addClass('d-none');
                $(".typing").lbyl({
                    content: '注册成功',
                    speed: 100,
                    type: 'show',
                    finished: function () {

                    }
                });
            }
        });
        // setTimeout( () => {
        //     if (flag1 == 1 && flag2 == 1 && flag3 == 1 && flag4 == 1 && flag5 == 1 && flag7==1) {

        //     } else {$('.submit').removeAttr("disabled");
        //     $('.rsp').addClass('d-none');
        //         $(".typing").lbyl({
        //             content: '注册失败，请检查是否填写信息.',
        //             speed: 100,
        //             type: 'show',
        //             finished: function () {
        //             }
        //         });
        //     }
        // }, '1500')
    } else {
        $(".typing").lbyl({
            content: '两次输入的密码不正确',
            speed: 100,
            type: 'show',
            finished: function () {
            }
        });
    }
})

