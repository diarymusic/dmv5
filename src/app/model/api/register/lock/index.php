<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
//lock a token
$sr = array('status'=>200);
$er = array('status'=>404);
if(isset($_GET['to'])){
    $to = (!($_GET['to']==''))?$_GET['to']:'GUEST';
    $sql = "INSERT INTO uids (`token`,`stat`)
    VALUES (?,?)";
    $dsql->bind($sql,'si',$_GET['to'],'1');
    
    echo json_encode($sr,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}else{
    echo json_encode($er,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}
// $sql1 = 'SET @rownum = 0; 
// UPDATE uids SET id =@rownum:=@rownum+1 
// WHERE id >0;';
// $dsql->bind($sql1);
$dsql->close();