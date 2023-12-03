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

$idToUpdate = 1; // 更新的记录 ID
$cover = $_POST['c'];
$title = $_POST['t'];
$author = $_POST['a'];
$idct = $_POST['i'];
$link = $_POST['l'];

$sql = "UPDATE newsong
        SET cover=?, title=?, author=?, idct=?, link=? WHERE id=?";

$dsql->bind($sql, 'sssssi', $cover, $title, $author, $idct, $link, $idToUpdate);