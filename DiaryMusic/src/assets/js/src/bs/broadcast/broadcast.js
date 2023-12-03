// const to = $('temp').remove().attr('data-token');
// const token = (typeof to !== 'undefined') ? to : 0;
paraindex=1;
$(".append").on('click',()=>{
    $('<textarea class="form-control mb-3 cont" name="cont" data-inputId="'+paraindex+'" rows="3" data-clicked="n" aria-label="段落'+paraindex+'">段落'+paraindex+'</textarea><a class="closeTextArea" data-close="'+paraindex+'">&times;</a>').appendTo('.paragraphs')
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
    $("*[data-inputId="+clickedElement[1]+"]").remove();
    $(clickedElement[0]).remove();
    // console.log(clickedElement[1]);
    paraindex = $("html").find(".cont").length
    /*** 重新计数 */ 
    // console.log(paraindex);
});
$('.submit').on('click',()=>{
    
    // if(($('input[name=title]').val())&&($('input[name=title]').val())){

        getUserBytoken(token,(resp)=>{
            var form = new FormData;
            if(resp.data[0].permission==99 && $("html").find("input[name=pub]:checked").length==1){
                form.append("public",1)
            }else{
                form.append("public",0)
            }
            var title = ($('input[name=title]').val())?$('input[name=title]').val():"无标题";
            form.append('title',title);
            var cont = $(document).find('.cont');
            for (let index = 0; index < cont.length; index++) {
                form.append(`paragraphs[${index}]`,$(cont[index]).val())
            }
            if (resp.status == 200) {
                Object.entries(resp.data[0]).forEach(([key,value]) => {
                    // console.log(key+"=>"+value);
                    form.append(`owner[${key}]`,value)
                });

                    $.ajax({
                        url:`/app/model/api/setBroadcast/`,
                        type:"post",
                        cache:false,
                        contentType: false,
                        processData:false,
                        data:form,
                        success:(resp)=>{
                            // console.log(resp)
                            $('input[name=title]').val("");
                            $("html").find(".cont").empty().remove()
                            $("html").find(".closeTextArea").remove()
                            paraindex=0
                            $(".append").click()
                        }
                    })
            }
        });

})
$(document).on('keypress',function(event){
    // event.preventDefault();
    if(event.keyCode == "13"){
        // $("#send").click();
        if($("textarea.cont:focus,input#title:focus").length!==0){
            if($('input#title:focus').length==1){
                $("textarea.cont")[0].focus();
            }
            // else{
                
            //     $("textarea.cont")[$("textarea.cont:focus").attr('data-inputId')+1].focus();
            // }
        }else{
            $("input#title").focus();
        }
    }
});