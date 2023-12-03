$(() => {
    $("#fileAjax").on("change", () => {
        // console.log($('#fileAjax').prop('files')[0]);
        var reader = new FileReader();
        reader.readAsDataURL($('#fileAjax').prop('files')[0]);
        reader.onload = function () {
            $("#PreviewModal").modal("show");
            $("#PreviewModal").find(".avaImgPrv").attr("src",reader.result)
            $("#PreviewModal").on("shown.bs.modal", () => {
                $(".avatSaveBtn").on("click", () => {
                    var form_data = new FormData();
                    form_data.append('bs', reader.result);
                    form_data.append('to', to);
                    $.ajax({
                        url: '/app/model/api/bs64up/', // point to server-side PHP script 
                        dataType: 'json',  // what to expect back from the PHP script, if anything
                        cache: false,
                        contentType: false,
                        processData: false,
                        data: form_data,
                        type: 'POST',
                        success: function (resp) {
                            if (resp.status == "200") {
                                flag2 = 1;
                                $(`    <div class="alert alert-success alert-dismissible fade show fixed-bottom m-3" role="alert" id="tipSuccess">
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                <strong>头像修改成功!</strong>
                            </div>`).appendTo("body");
                            // $("#tipSuccess").alert()
                            $("#PreviewModal").modal("hide");
                            } else {
                                flag2 = 0;
                            }
                        }
                    });
                });
            });
        };
    });
    $(".submit").on("click", () => {
        getUserBytoken(to,(resp)=>{
            if(resp.status==200){
                var originUsername=resp.data[0].username;
                var inname = $("input[name=un]").val();
                var un = (inname !== "")?inname:originUsername;
                console.log(un);
                var p = b64_sha256($("#psw").val());
                form = new FormData();
                form.append("username",un);
                form.append("pass",p);
                $.ajax({
                    url:`/app/model/api/cuinfo/?token=${to}`,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: form,
                    type: 'POST',
                    success:()=>{
                        getUserBytoken(token,(resp)=>{
                            if (resp.status == 200) {
                                uid=resp.data[0].id
                                if(resp.data[0].ban==1){
                                    location.href=`/?action=login&callback=${location.href}`
                                }
                                $('html').each(function () {
                                    $(this).find('.userName').text(resp.data[0].username);
                                    $(this).find('.userId').text('UID: ' + resp.data[0].id);
                                    $(this).find('.userAvatar').attr('src', resp.data[0].avatar);
                                    if (resp.data[0].id == "1") {
                                        $(this).find('.userId').empty();
                                    }
                                });
                            }
                        });
                    },
                });
            }else{
                location.href=`/?action=login&callback=${location.href}`
            }
        });
    });
});