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
$('.send').on('click', () => {
    $.ajax({
        url: '/app/model/api/geneVerf/?em=' + $('input[name=ue]').val(),
        dataType: 'json',
        async:false,
        // data: form_data,
        type: "GET",
        success: function (resp) {
            flag4 = (resp.status == "200") ? 1 : 0;
            // console.log(resp.code)
        }
    })
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
        type: 'fade',
        finished: function () {

        }
    });
    $.ajax({
        url: '/app/model/api/sendCode/?em=' + $('input[name=ue]').val(), // point to server-side PHP script 
        dataType: 'json',  // what to expect back from the PHP script, if anything
        type: 'GET',
        success: function (resp) {
            if (resp.status == "200") {
                // $('.send').removeAttr("disabled");
                flag5 = 1
                $('#vfi').addClass('col-8');
                $('#vfi').removeClass('col-6');
                $('#vfb').addClass('col-4');
                $('#vfb').removeClass('col-6');
                $('#vfsp').addClass('d-none');
                $(".typing").lbyl({
                    content: '验证码发送成功，请注意接收',
                    speed: 100,
                    type: 'fade',
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
                    type: 'fade',
                    finished: function () {

                    }
                });
            }
        }
    });
    setTimeout(() => {
        // if (flag5 == 0) {
            $('.send').removeAttr("disabled");
            // $(".typing").lbyl({
            //     content: '验证码发送超时',
            //     speed: 100,
            //     type: 'show',
            //     finished: function () {

            //     }
            // });
        // }

    }, 5000);
})
$('.submit').click(function(){
    if($('input[name=npw]').val()==$('input[name=repsw]').val()){
        $(".typing").lbyl({
            content: '正在修改...',
            speed: 100,
            type: 'show',
            finished: function () {
            }
        });
        var ue = $('input[name=ue]').val()
        var npw = b64_sha256($('input[name=npw]').val())
        var vf = $('input[name=vf]').val()
        var form_data = new FormData();                  
        form_data.append('em', ue);
        form_data.append('npw', npw);
        form_data.append('vf', vf);
        $.ajax({
            url:"/app/model/api/forgotPassword/",
            type:"POST",
            dataType: 'json',  // what to expect back from the PHP script, if anything
            cache: false,
            contentType: false,
            processData: false,
            data:form_data,
            success:function(resp) {
                flag4 = (resp.status==200)?1:0;
                if(resp.status==200){
                    $(".typing").lbyl({
                        content: '修改成功，请返回登录',
                        speed: 100,
                        type: 'show',
                        finished: function () {
                        }
                    });
                }else{
                    $(".typing").lbyl({
                        content: '修改密码失败',
                        speed: 100,
                        type: 'show',
                        finished: function () {
                        }
                    });
                }
            }
        })
    }else{
        $(".typing").lbyl({
            content: '两次输入的密码不正确',
            speed: 100,
            type: 'show',
            finished: function () {
            }
        });
    }
})