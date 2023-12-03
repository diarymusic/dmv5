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
if (isset($_POST['nsp'])) {
    // 如果存在'nsp'参数，重定向到'/api/addNewSong'
    header("location: /api/addNewSong");
    exit;
}
if (isset($_POST['c'], $_POST['t'], $_POST['a'], $_POST['i'], $_POST['l'])) {
    $dsql = new dSql;
    $dsql->bind("INSERT INTO songs (`cover`, `title`, `author`, `idct`, `link`) VALUES (?, ?, ?, ?, ?)",'sssss',$_POST['c'], $_POST['t'], $_POST['a'], $_POST['i'], $_POST['l']);
    $dsql->close();
}