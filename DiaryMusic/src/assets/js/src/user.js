uid=1;
const to = $('temp').remove().attr('data-token');
// $('temp').remove()
// console.log(to)
const token = (typeof to !== 'undefined') ? to : 0;
function getUserBytoken(e,f){
    $.ajax({
    url: '/app/model/api/getUser/?token=' + e, // point to server-side PHP script 
    dataType: 'json',  // what to expect back from the PHP script, if                        
    type: 'GET',
    success: f
});
}
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

$('.signoutBtn').click(function () {
    $.ajax({
        url: "/app/model/api/logout/",
        success: function () {
            window.location.href = "/?action=login"
        }
    })
})