<?php

?>
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script>
    $.ajax({
         type: "GET",
         url: "https://www.beatarray.com/api/submit/labelAuditGetSubmits?page=1&pageSize=1000&sortKey=createdTime&sortMethod=-1&labelId=263",
         
         headers: {
             Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc0MywiaWF0IjoxNjkyMTk1MTk5LCJleHAiOjE2OTQ3ODcxOTl9.2j2ZUxGs90-gZGX1Vwp3eDwZxqBV8NkcWLOpvDZ_B78" ,
         },
         success: function(result) {
            console.log(result['data']['list']);

         }
     });
</script>