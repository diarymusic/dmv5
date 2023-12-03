<?php
session_start();
function loginWarn(){
    echo json_encode(array('错误'=>'请先登录'),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}
if (isset($_SESSION['loginedStat'])) {
    if ($_SESSION['loginedStat'] == 0) {
        loginWarn();
        exit();
    } elseif (isset($_SESSION['isAdmin']) && $_SESSION['isAdmin']) {
        // 管理页面使用
    } else {
        loginWarn();
        exit();
    }
} else {
    loginWarn();
    exit();
}
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT'])."/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;

    $sql = "SELECT id 
            FROM `uids`
            ORDER BY id DESC LIMIT 1";
$res = $test->bind($sql,'i','1');
$r = array();
while ($row = $res->fetch_assoc()) {
    array_push($r,$row);
}
echo json_encode($r,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
