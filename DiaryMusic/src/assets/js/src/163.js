function get163All4Vue() {
    var res;


        $.ajax({
            url: "/get163/",
            dataType: 'json',
            async: false,
            headers: { 'Content-Type': 'application/json;charset=utf8', 'Access-Control-Allow-Origin': '*' },
            success: (data) => {
                res = data
            },
            error: (e) => {
            }
        });
        return res;
}