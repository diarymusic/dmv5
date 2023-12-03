// (function ($) {
//     $.fn.extend({
//         send: function () {
//             console.log($(this).text());
//         }
//     })
// })(jQuery)
function entityToString(entity) {
    var div = document.createElement('div');
    div.innerHTML = entity;
    var res = div.innerText || div.textContent;
    console.log(entity, '->', res);
    return res;
}
uid = 1;
$(() => {
    queue = 0;
    var msg_error = (queue,cont) => {
        context = `<div class="ms-4 me-4 alert alert-danger alert-dismissible fade show" role="alert" data-alert-queue="${queue}">
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <strong>消息发送失败！请稍后再试</strong>消息内容：${cont}
    </div>
    `;
    queue++;
    $(context).appendTo("body");
    };
    var username = "未登录";
    var avatar = "/uploads/uid_GUEST.png";
    // 连接服务端
    var socket = io('https://' + document.domain + ':2120');
    // 连接后登录
    socket.on('connect', function () {
        getUserBytoken(token, (resp) => {
            if (resp.status == 200) {
                uid = resp.data[0].id;
                if (uid !== 1) {
                    //登录
                    username = resp.data[0].username;
                    avatar = resp.data[0].avatar;
                    socket.emit('login', token);
                    $(".chatload").css("opacity", "0")
                    setTimeout(() => {
                        $(".chatload").addClass("d-none")
                    }, 1000);
                } else {
                    location.href = `?action=login&callback=${window.location.href}`
                }
            }
        });
        socket.on('new_msg', function (msg) {
            // var lr = "r";
            msg = JSON.parse(entityToString(msg))
            // console.log(msg);
            // console.log(msg.cont);
            // console.log(msg.owner[0].avatar);
            // console.log(msg.owner[0].username);
            tmp = (msg, uid) => {
                var lr = (msg.owner[0].uid == uid) ? "r" : "l";
                var username = msg.owner[0].username ?? "未登录";
                var avatar = msg.owner[0].avatar ?? "/uploads/uid_GUEST.png";
                var cont = msg.cont ?? "";
                var context = `
                <div class="row justify-content-center align-items-center g-2 mb-3 msgRow">
                <div class="col-12">
                        <div class="msgBox msg-${lr}  ps-1 pe-1 m-2"
                        style="background: radial-gradient(circle at 0%, transparent 0%, var(--background-color) 75%),url('${avatar}');">
                        <div class="msg-own mt-1 mb-2">
                            <div class="msg-image">
                                <img class="" src="${avatar}" alt="">
                            </div>
                            <span class="msg-name">${username}</span>
                        </div>
                        <div class="msg-body">
                            <div class="msg-text">
                                <span class="text-pre-wrap">${cont}</span>
                            </div>
                        </div>
                    </div>
                    </div>
            </div>
                `;
                return context;
            };


            $(tmp(msg, uid)).appendTo(".chatMsgContainer");
        });

        socket.on('update_online_count', function (online_stat) {
            $('.onlineCount').html(online_stat);
        });


        var cd = 1;
        $(".send").attr("disabled", "disabled");
        $("#mTxt").on("input", () => {
            if ($("#mTxt").val() !== "" && cd !== 0) {
                $(".send").removeAttr("disabled");
            }
            if ($("#mTxt").val() == "") {
                $(".send").attr("disabled", "true");
            }
        });
        $(".send").on("click", () => {

            var cont = $("#mTxt").val();
            $("#mTxt").val('');
            $(".send").attr("disabled", "true");
            var b = {};
            b["cont"] = cont;
            b["owner"] = [{
                "uid": uid,
                // "token": token,
                "username": username,
                "avatar": avatar,

            }]

            var form_data = new FormData();
            form_data.append("type", "publish");
            form_data.append("to", "");

            console.log(b);
            console.log(form_data);
            // socket.emit(['sendMsg', b]);
            var c = JSON.stringify(b);
            form_data.append("content", c);
            $.ajax({
                url: "http://" + document.domain + ":2121",
                dataType: "text",
                type: "post",
                cache: false,
                contentType: false,
                processData: false,
                data: form_data,
                success:()=>{
                    // msg_error(queue,cont)
                },
                error:()=>{
                    msg_error(queue,cont)
                }
            });
        });
    });
});