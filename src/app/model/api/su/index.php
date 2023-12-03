<?php
session_start();
function loginWarn()
{
    echo json_encode(array('错误' => '请先登录'), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}
if (isset($_SESSION['loginedStat'])) {
    if ($_SESSION['loginedStat'] == 0) {
        loginWarn();
        exit();
    }
} else {
    loginWarn();
    exit();
}
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']) . "/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
if (isset($_POST['n'], $_POST['u'], $_POST['a'], $_POST['z'], $_POST['y'], $_POST['g'])) {

    // 使用预处理语句来插入数据，以防止SQL注入攻击
    $sql = "INSERT INTO suggs (`name`, `userid`, `album`, `author`, `style`, `sugg`) 
        VALUES (?, ?, ?, ?, ?, ?)";
    $dsql->bind($sql, 'sissss', $_POST['n'], $_POST['u'], $_POST['a'], $_POST['z'], $_POST['y'], $_POST['g']);
    $dsql->close();
}