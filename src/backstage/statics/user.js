var currUID = $('temp').attr('data-cuid');
$('temp').remove()
// console.log(currUID)
if(typeof currUID !== 'undefined'){

}else{
    currUID = '-1'
}
$.ajax({
    url: '/api/getUser?'+'currUID='+currUID, // point to server-side PHP script 
    dataType: 'json',  // what to expect back from the PHP script, if anything
    cache: false,
    contentType: false,
    processData: false,                        
    type: 'GET',
    success: function(php_script_response){
        // alert(php_script_response); 
        // display response from the PHP script, if any
        // $('#status').text(php_script_response)
        // $('#userAvatar').attr('src',php_script_response['lists']['avatar'])
        // $('userName').text(php_script_response['lists']['username'])
        // console.log(php_script_response)
        location.reload();
    }
});

$('.signoutBtn').click(function(){
    $.ajax({
        url:"/api/logout",
        success:function(){
            window.location.href = "/login"
        }
    })
})