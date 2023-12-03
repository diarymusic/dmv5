<?php
session_start();
function loginWarn(){
    echo json_encode(array('错误'=>'请先登录'),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}

require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT'])."/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;

// 查询数据库
$sql = "SELECT * FROM newsong;";
$res = $dsql->bind($sql,'i','1');
$r = array();
while ($row = $res->fetch_assoc()) {
    array_push($r,$row);
}
echo json_encode($r,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);

