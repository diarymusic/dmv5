<?php
session_start();
function loginWarn(){
    echo json_encode(array('错误'=>'请先登录'),JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES);
}
if (isset($_SESSION['ls'])) {
    if ($_SESSION['ls'] == 0) {
        loginWarn();
        exit();
    } elseif (isset($_SESSION['ad']) && $_SESSION['ad']) {
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

$INVCODEradm = md5('DiaryMusicInvitationCodeRootAdmin');
$INVCODEadm = md5('DiaryMusicInvitationCodeAdmin');
$INVCODE = md5('DiaryMusicInvitationCode');
$inv = 0;
if (isset($_POST['un'], $_POST['ue'], $_POST['ap'], $_POST['pw'])) {
    $perm = 0; // 默认权限

    if (isset($_POST['iv'])) {
        $invCodes = [
            $INVCODEradm => 99,
            $INVCODEadm => 98,
            $INVCODE => 97,
            $inv => 0
        ];

        $user_iv = $_POST['iv'];
        $perm = $invCodes[$user_iv] ?? 0;
    }
}
$dsql = new dSql;
$sql = "INSERT INTO uids (`acc`, `username`, `password`, `token`, `avatar`, `permission`)
        VALUES (?,?,?,?,?,?)";
$dsql->bind($sql, 'sssssi', $_POST['ue'], $_POST['un'], $_POST['pw'], $_POST['to'], $_POST['ap'], $perm);
$dsql->close();