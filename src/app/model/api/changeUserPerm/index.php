<?php
session_start();
function loginWarn(){
    echo json_encode(array('status'=>'404'),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}

require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT'])."/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
$sql='UPDATE uids SET `permission`=? WHERE `id`=?;';
$dsql->bind($sql,'ii',$_GET['perm'],$_GET['id']);
$dsql->close();

