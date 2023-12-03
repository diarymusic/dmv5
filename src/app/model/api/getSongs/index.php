<?php
session_start();
function loginWarn(){
    echo json_encode(array('错误'=>'请先登录'),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}
// if (isset($_SESSION['loginedStat'])) {
//     if ($_SESSION['loginedStat'] == 0) {
//         loginWarn();
//         exit();
//     } elseif (isset($_SESSION['isAdmin']) && $_SESSION['isAdmin']) {
//         // 管理页面使用
//     } else {
//         loginWarn();
//         exit();
//     }
// } else {
//     loginWarn();
//     exit();
// }
require_once str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT'])."/app/model/classes/classes.php";
header("Content-type: text/html; charset=utf-8");
$dsql = new dSql;
$r = array();
$errr = array("错误"=>"无结果");
    if(isset($_GET['id'])){
        $id = ($_GET['id'] <= 0||$_GET['id']==null)? 1:$_GET['id'] ;
            $sql = "SELECT * FROM songs WHERE id=?";
            $res = $dsql->bind($sql,'i',$id);
    }else{
        $sql = "SELECT * FROM songs ORDER BY id DESC;";
        $res = $dsql->bind($sql);
    }
    if ($res->num_rows > 0) {
        while ($row = $res->fetch_assoc()) {
            array_push($r,$row);
        }

    } else {
        $r = $errr;
    }

echo json_encode($r,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
