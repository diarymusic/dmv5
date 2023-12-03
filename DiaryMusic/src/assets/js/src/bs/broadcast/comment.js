// const to = $('temp').remove().attr('data-token');
// const token = (typeof to !== 'undefined') ? to : 0;
paraindex = 1;
$(".append").on('click', () => {
    $('<textarea class="form-control mb-3 cont" name="cont" data-inputId="' + paraindex + '" rows="3" data-clicked="n" aria-label="段落' + paraindex + '">段落' + paraindex + '</textarea><a class="closeTextArea" data-close="' + paraindex + '">&times;</a>').appendTo('.paragraphs')
    paraindex++;
})
$(document).on('click', '.cont', (event) => {
    // 使用event.target来访问被委托的元素
    var clickedElement = [
        event.target,
        $(event.target).attr("data-inputId"),
    ];
    $(clickedElement[0]).empty()
});


$(document).on('click', '.closeTextArea', (event) => {
    // 使用event.target来访问被委托的元素
    var clickedElement = [
        event.target,
        $(event.target).attr("data-close"),
    ];
    // $(clickedElement[0]).empty()
    $("*[data-inputId=" + clickedElement[1] + "]").remove();
    $(clickedElement[0]).remove();
    // console.log(clickedElement[1]);
    paraindex = $("html").find(".cont").length
    /*** 重新计数 */
    // console.log(paraindex);
});
$('.submit').on('click', () => {

    // if(($('input[name=title]').val())&&($('input[name=title]').val())){

    getUserBytoken(token, (resp) => {
        var form = new FormData;
        form.append("public", 0)
        var title = ($('input[name=title]').val()) ? $('input[name=title]').val() : "无标题";
        form.append('title', title);
        var cont = $(document).find('.cont');
        for (let index = 0; index < cont.length; index++) {
            form.append(`paragraphs[${index}]`, $(cont[index]).val())
        }
        if (resp.status == 200) {
            Object.entries(resp.data[0]).forEach(([key, value]) => {
                // console.log(key+"=>"+value);
                form.append(`owner[${key}]`, value)
            });

            $.ajax({
                url: `/app/model/api/setBroadcast/`,
                type: "post",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                success: (resp) => {
                    // console.log(resp)
                    $('input[name=title]').val("");
                    $("html").find(".cont").empty().remove()
                    $("html").find(".closeTextArea").remove()
                    paraindex = 0
                    $(".append").click()
                }
            })
        }
    });
    $("#relPassageModal").modal("hide");
    setTimeout(() => {
        getAllPassage(2);

    }, 1000);

})

function comment(i, c, f) {
    getUserBytoken(token, (resp) => {
        if (resp.status == 200) {
            var form = new FormData;
            var c = $("input[name=content]").val()
            form.append("id", i);
            form.append("content", c);
            Object.entries(resp.data[0]).forEach(([key, value]) => {
                // console.log(key+"=>"+value);
                form.append(`owner[${key}]`, value)
            });
            $.ajax({
                url: '/app/model/api/addComment/',
                dataType: "json",
                type: "post",
                cache: false,
                contentType: false,
                processData: false,
                data: form,
                success: f
            });
        }
    })
}

var recursiveFunction = function () {
    var str = ''
    const getStr = function (list) {
        list.forEach(function (row) {
            if (row.children) {
                getStr(row.children)
            } else {
                str += row.name + ";"
            }
        })
    }
    getStr(data)
    console.log(str)
}
// recursiveFunction()

// $(document).on("click", ".relCommentBtn", () => {
//     comment()
// })
function cb(btn){
    //btn is dom
    console.log(
    $(btn).attr("")
    );
}