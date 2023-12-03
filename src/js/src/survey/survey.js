var currUID = $('temp').attr('data-cuid');
$('temp').remove()
// var el = $('<tempuid'+currUID+'>')
// el.appendTo('body')


$('.mf').submit(function(env){
    var foo = new FormData();
    foo.append('u',currUID)
    // alert("1")
    env.preventDefault()
    var n = $('input[name=n]').val();
    var a = $('input[name=a]').val();
    // var z = $('input[name=z]').val();
    var g = $('input[name=g]').val();
    $("input[type=radio]:checked").each(function() {
        y = $(this).attr('id');
        // alert(item);
        foo.append('y',y)
    })
    foo.append('n',n)
    foo.append('a',a)
    foo.append('z',n)
    foo.append('g',g)
    $.ajax({
        url:"/api/su",
        type:"POST",
        data:foo,
        contentType:false,
        processData:false,
        success:function(){

        }
    })
})
