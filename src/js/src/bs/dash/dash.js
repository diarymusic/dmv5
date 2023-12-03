const BATOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc0MywiaWF0IjoxNjk4MTYwNjEwLCJleHAiOjE3MDA3NTI2MTB9.dfJSxhCquAGdDANvM4K1zMURJiCvgs1C5OxynA0WEiI";

$(function () {

    $.ajax({
        type: "GET",
        url: "https://www.beatarray.com/api/submit/labelAuditGetSubmits?page=1&pageSize=1000&sortKey=createdTime&sortMethod=-1&labelId=263",
        // url:"./backstage/statics/test.json",
        headers: {
            Token: BATOKEN,
        },
        success: function (result) {
            if (result.status == 0) {


                var total = result['data']['total'];
                var list = result['data']['list'];

                for (let index = 0; index < list.length; index++) {
                    // var ix = str.indexOf(list[]);
                    // if(ix=="-1" | ix=="2"){//大于0 代表存在，
                    // str.splice(ix,1);//存在就删除
                    // }


                    var title = list[index]['title'];
                    var genre = list[index]['genre'];
                    var type = list[index]['type'];
                    var author = list[index]['author'];
                    var link = list[index]['link'];
                    var code = list[index]['code'];
                    var status = list[index]['status'];
                    var disable = ''
                    if (status == -1) {
                        state = '未过审'
                        disable = 'disabled'
                    } else if (status == 0) {
                        state = '待审核'
                    } else if (status == 1) {
                        state = '待复审'
                    } else if (status == 2) {
                        state = '已过审'
                        disable = 'disabled'
                    }
                    var date = list[index]['updatedTime'];
                    if (status == -1 || status == 2) {
                    } else {
                        var l = $('<tr><td>' + title + '</td><td>' + author + '</td><td>' + date + '</td><td>' + state + '</td><td><button class="btn btn-outline-dark audit" data-bs-toggle="modal" data-bs-target="#auditmode"' + 'data-snm="' + title + '"' + 'data-aut="' + author + '"' + 'data-gnr="' + genre + '"' + 'data-typ="' + type + '"' + 'data-cod="' + code + '"' + 'data-lnk="' + link + '"' + disable + '>审核</button></td></tr>')
                        l.appendTo('.activity-tab')
                    }
                }
            }
        }
    });
    $(function () {
        $(document).on('click', '.audit', function () {
            $('#amtit').empty().text('  ' + $(this).attr('data-snm'))
            $('#amaut').empty().text('  ' + $(this).attr('data-aut'))
            $('#amgnr').empty().text('  ' + $(this).attr('data-gnr'))
            $('#amtyp').empty().text('  ' + $(this).attr('data-typ'))
            $('#amcod').empty().text('  ' + $(this).attr('data-cod'))
            $('#amlnk').empty().text('  ' + $(this).attr('data-lnk'))
        })
    })

    $.ajax({
        type: "GET",
        url: "https://www.beatarray.com/api/label/overview?labelId=263",
        headers: {
            Token: BATOKEN,
        },
        success: function (result) {
            if (result.status == 0) {
                var submit = result['data']['submit'];
                var subtotal = submit['total'];
                var subpass1 = submit['pass1'];
                var subpass2 = submit['pass2'];
                var unresolved = submit['unresolved'];
                $('#total').text(subtotal);
                $('#waitAudit').text(unresolved);
                $("#passed").text(subpass1 + '/' + subpass2);
            }
        }
    });
})
