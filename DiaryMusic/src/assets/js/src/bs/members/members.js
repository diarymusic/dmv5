// $("#upload").click(function(){
//         $.ajax({
//         url:"/api/addUser",
//         type:"POST",
//         success:function(result){
            
//         }
//     })
// })

function getMembersById(sid=-1,f) {
    $.ajax({
        url: `/app/model/api/getUserById/?id=${sid}`,
        dataType: "json",
        success: f
    })
}
function getAllmember(columns = 2) {
    //get all member
    columns = (columns > 12 && columns < 1) ? columns : 2;
    console.log(columns);
    cols = parseInt(columns)
    col = 12 / cols;
    console.log(col);
    getMembersById(-1,(resp) => {
        if (resp.status == 200) {
            $(".membersContainer").empty();
            for (let li = 0; li < resp.list.length; li++) {
                $(`<div class="col-md-${col} col-sm-12 p-3">
            <div class="card" onclick="getOnememberById(${resp.list[li].id})" data-memberId="${resp.list[li].id}" data-bs-toggle="modal" data-bs-target="#memberModal" data-show="showque" style="opacity:0;transform:scale(0.8)">
            <div class="logo-name p-3 ps-2" style="opacity:0;">
            <div class="logo-image d-none d-md-flex">
                <img src="${resp.list[li].avatar}" alt="" id="" class="">
            </div>

            <span class="logo_name me-3"id="">用户名： ${resp.list[li].username} &nbsp;&nbsp;&nbsp;UID： ${resp.list[li].id}</span>&nbsp;&nbsp;&nbsp;

        </div>
                <div class="card-body">
                    <h4 class="card-title pt" style="opacity:0;">${'User#' + (resp.list[li].id) + ': ' + resp.list[li].username}</h4>
                </div>
            </div>
        </div>`).appendTo(".membersContainer");
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
                        $('.membersContainer').find(`div.logo-name`).eq(counts).css("opacity", "1")
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
function getOnememberById(id) {
    // console.log(id.attr("data-memberId"));
    getMembersById((id), (resp) => {
        if (resp.status == 200) {
            // $(".pmt").empty();
            $(".pmb").empty();
            $(".pmf").empty();
            for (let li = 0; li < resp.list.length; li++) {
                $(`<div class="logo-name p-1 ps-2">
            <div class="logo-image">
                <img src="${resp.list[li].avatar}" alt="" id="" class="">
            </div>
            <!-- 上方src添加个人头像 -->
            <span class="logo_name me-3" id="">用户名： ${resp.list[li].username} &nbsp;&nbsp;&nbsp;UID： ${resp.list[li].id}</span>&nbsp;&nbsp;&nbsp;
        </div>`).appendTo(".pmb");
        $(`
        <div class="row justify-content-center align-items-center g-2">
 <div class="col-2">操作：</div>
        <div class="col-5"><button type="button" class="btn btn-outline-dark onclick="changePerm(0)">权限:管理员</button></div>
        <div class="col-5"><button type="button" class="btn btn-outline-dark" onclick="changePerm(99)">权限:用户</button></div>
</div>
       
        `).appendTo(".pmf")
            }
            // console.log(conts);
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
            }, 10);
        }
    });
}

$(getAllmember(2))
{/* <button type="button" class="btn btn-outline-dark">Button</button> */}
