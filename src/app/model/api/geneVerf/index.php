<?php
session_start();
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
//lock a token
$vf = mt_rand(1000,9999);

if(isset($_GET['to'])){
    $sql = "UPDATE `uids` SET `verf`=? WHERE (`token`=?);";
    $status = ($dsql->bind($sql, 'is', $vf, $_GET['to']))?200:404;
}elseif(isset($_GET['em'])){
    $sql = "UPDATE `uids` SET `verf`=? WHERE (`acc`=?);";
    $status = ($dsql->bind($sql, 'is', $vf, $_GET['em']))?200:404;
}else{
    $status = 404;
}
$sr = array(
    'status'=>$status,
    // 'code'=>$vf
);
echo json_encode($sr,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
// $sql1 = 'SET @rownum = 0; 
// UPDATE uids SET id =@rownum:=@rownum+1 
// WHERE id >0;';
// $dsql->bind($sql1);
$dsql->close();