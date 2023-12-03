const getABroadcast = ()=>{
        $.ajax({
        url: "/app/model/api/getBroadcast/?type=broadcast",
        dataType: "json",
        success: (resp) => {
            // alert("1")
            if (resp.status == 200) {
                $('#broadcast').modal('show')
                var conts = "";
                for (let li = 0; li < resp.list.length; li++) {
                    $('#broadcast').find('.mth').text('Diary#'+(resp.list[0].id)+': '+resp.list[li].data.content.title)
                    for (let index = 0; index < resp.list[li].data.content.paragraphs.length; index++) {
                        // console.log(resp.data.content.paragraphs[index])
                        conts = conts + "<p style='opacity:0' data-show='showque' data-showque=''>" + resp.list[li].data.content.paragraphs[index] + "</p>" + "";
                    }
                    $("html").find('.passOwner').text(resp.list[li].owner.username)
                }
                // console.log(conts);
                $(conts).appendTo('.mtb')
                $(document).on('shown.bs.modal', function () {
                    var counts = 0;
                    var t = setInterval(()=>{
                        // $("#time").append(arr[counts]);
                        $('html').find("p[data-show=showque]").eq(counts).css("opacity", "1")
                        counts++;
                        //claer interval
                        if (counts > $('html').find("p[data-show=showque]").length) {
                            clearInterval(t)
                        }
                    }, 20);
                });
            }
        }
    })
    return null;
}
// console.log("123")

   getABroadcast(); 
