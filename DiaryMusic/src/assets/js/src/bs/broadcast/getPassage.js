//*通过id查询


function getPassageById(sid = "-1", f) {
    $.ajax({
        url: `/app/model/api/getBroadcast/?type=passage&id=${sid}`,
        dataType: "json",
        success: f
    })
}
function getAllPassage(columns = 2) {
    //get all passage
    columns = (columns > 12 && columns < 1) ? columns : 2;
    console.log(columns);
    cols = parseInt(columns)
    col = 12 / cols;
    console.log(col);
    getPassageById("-1", (resp) => {
        if (resp.status == 200) {
            $(".passagesContainer").empty();
            // $('#broadcast').modal('show')
            // conts = "";
            for (let li = 0; li < resp.list.length; li++) {
                conts = "";

                $(document).find('.mth').text('Diary#' + (resp.list[li].id) + ': ' + resp.list[li].data.content.title)
                for (let index = 0; index < resp.list[li].data.content.paragraphs.length; index++) {
                    // console.log(resp.data.content.paragraphs[index])
                    conts = conts + "<p style='opacity:0' data-show='showque' data-showque=''>" + resp.list[li].data.content.paragraphs[index] + "</p>" + "";
                }
                // $(document).find('.owner').eq(li).text(resp.list[li].owner.username)
                // console.log(resp.list[li].owner.username);
                // $(conts).appendTo('.pb')
                $(`<div class="col-md-${col} col-sm-12 p-3">
            <div class="card" onclick="getOnePassageById(${resp.list[li].id})" data-passageId="${resp.list[li].id}" data-bs-toggle="modal" data-bs-target="#passageModal" data-show="showque" style="opacity:0;transform:scale(0.8)">
            <div class="logo-name p-3 ps-2" style="opacity:0;">
            <div class="logo-image d-none d-md-flex">
                <img src="${resp.list[li].owner.avatar}" alt="" id="" class="">
            </div>

            <span class="logo_name me-3" id=""">作者： ${resp.list[li].owner.username} &nbsp;&nbsp;&nbsp;UID： ${resp.list[li].owner.id}</span>&nbsp;&nbsp;&nbsp;

        </div>
                <div class="card-body">
                    <h4 class="card-title pt" style="opacity:0;">${'Diary#' + (resp.list[li].id) + ': ' + resp.list[li].data.content.title}</h4>
                    <p class="card-text pb">${conts}</p>
                </div>
            </div>
        </div>`).appendTo(".passagesContainer");
            }
            // console.log(conts);
            setTimeout(() => {
                let counts = 0;
                let t = setInterval(() => {
                    // $("#time").append(arr[counts]);
                    $('html').find(`div[data-show=showque]`).eq(counts).css("opacity", "1").css("transform", "scale(1)")
                    counts++;
                    //如果超过数组长度，清除定时器
                    if (counts > $('html').find("div[data-show=showque]").length) {
                        clearInterval(t)
                    }
                }, 100);
                setTimeout(() => {
                    let counts = 0;
                    let t = setInterval(() => {
                        // $("#time").append(arr[counts]);
                        $('.passagesContainer').find(`div.logo-name`).eq(counts).css("opacity", "1")
                        counts++;
                        //如果超过数组长度，清除定时器
                        if (counts > $('html').find("div[data-show=showque]").length) {
                            clearInterval(t)
                        }
                    }, 100);
                }, 500);
                setTimeout(() => {
                    let counts = 0;
                    let t = setInterval(() => {
                        // $("#time").append(arr[counts]);
                        $('html').find(`.pt`).eq(counts).css("opacity", "1")
                        counts++;
                        //如果超过数组长度，清除定时器
                        if (counts > $('html').find("div[data-show=showque]").length) {
                            clearInterval(t)
                        }
                    }, 100);
                }, 600);
                setTimeout(() => {
                    let counts = 0;
                    let t = setInterval(() => {
                        // $("#time").append(arr[counts]);
                        $('html').find(`div[data-show=showque]`).eq(counts).css("box-shadow", "0px 0px 19px 2px rgba(0, 0, 0, 0.1)")
                        counts++;
                        //如果超过数组长度，清除定时器
                        if (counts > $('html').find("div[data-show=showque]").length) {
                            clearInterval(t)
                        }
                    }, 100);
                }, 200);
                setTimeout(() => {
                    let counts = 0;
                    let t = setInterval(() => {
                        // $("#time").append(arr[counts]);
                        $('html').find("p[data-show=showque]").eq(counts).css("opacity", "1")
                        counts++;
                        //如果超过数组长度，清除定时器
                        if (counts > $('html').find("p[data-show=showque]").length) {
                            clearInterval(t)
                        }
                    }, 20);
                }, 1000);
            }, 500)

        }
    }
    );
}

function getOnePassageById(id) {
    // console.log(id.attr("data-passageId"));
    getPassageById((id), (resp) => {
        if (resp.status == 200) {
            $(".pmt").empty();
            $(".pmb").empty();
            $(".pmf").empty();
            for (let li = 0; li < resp.list.length; li++) {
                conts = "";
                // console.log(resp.list[li].data.content.title);
                $("html").find('.pmt').text('Diary#' + resp.list[li].id + ': ' + resp.list[li].data.content.title)
                $("html").find(".relCommentBtn").attr("data-parentId",resp.list[li].id)
                for (let index = 0; index < resp.list[li].data.content.paragraphs.length; index++) {
                    // console.log(resp.data.content.paragraphs[index])
                    conts = conts + "<p style='opacity:0' data-show='showque' data-showque=''>" + resp.list[li].data.content.paragraphs[index] + "</p>" + "";
                }
                // $(document).find('.owner').eq(li).text(resp.list[li].owner.username)
                // console.log(resp.list[li].owner.username);
                // $(conts).appendTo('.pb')

                $(conts).appendTo(".pmb");

                $(`<div class="logo-name p-1 ps-2">
            <div class="logo-image">
                <img src="${resp.list[li].owner.avatar}" alt="" id="" class="">
            </div>
            <!-- 上方src添加个人头像 -->
            <span class="logo_name me-3" id="">作者： ${resp.list[li].owner.username} &nbsp;&nbsp;&nbsp;UID： ${resp.list[li].owner.id}</span>&nbsp;&nbsp;&nbsp;
        </div>`).appendTo(".pmf");
            }
            // console.log(conts);
            setTimeout(() => {
                let counts = 0;
                let t = setInterval(() => {
                    // $("#time").append(arr[counts]);
                    $('html').find("*[data-show=showque]").eq(counts).css("opacity", "1")
                    counts++;
                    //如果超过数组长度，清除定时器
                    if (counts > $('html').find("*[data-show=showque]").length) {
                        clearInterval(t)
                    }
                }, 20);
            }, 10);
        }
    });
}

$(document).on('shown.bs.modal', function (event) {
    // setTimeout(() => {
    var counts = 1;
    var t = setInterval(() => {
        $(".modal-content").css("box-shadow", "0px 0px "+counts+"px 0px rgba(0, 0, 0, 0.5)")
        counts++;
        if (counts > 100) { clearInterval(t) }
    }, 1);
    // },0);
    $('#passageModal').find(".comments").css("opacity", "1")
})



$(document).on('hidden.bs.modal', function (event) {
    $(".modal-content").css("box-shadow", "0px 0px 0px 0px rgba(0, 0, 0, 0.5)")
    $('#passageModal').find("*[data-show=showque]").css("opacity",0)
    getAllPassage(2)

    // alert("1")
})


getAllPassage(2)